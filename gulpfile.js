var gulp = require('gulp');
var run = require('gulp-run');
var runSequence = require('run-sequence');
var rename = require("gulp-rename");
var del = require('del');
var gWebpack = require('gulp-webpack');
var path = require('path');
var chdir = require('chdir-promise');

var cordovaBuildDir = path.join(__dirname, 'build-cordova');
var webpackCordovaConfig = require("./webpack-cordova.config.js");
var platformDirs = [path.join(__dirname, 'node_modules', 'cordova-android')]; // List of subdirs with platform files under node_modules
var testPlatform = 'android';

var cordovaLib = require('cordova-lib');
var cdv = cordovaLib.cordova.raw;
var cordovaPlugins = ['org.apache.cordova.device', 'cordova-plugin-whitelist', 'org.apache.cordova.splashscreen', 'cordova-plugin-inappbrowser'];

gulp.task('build-js-cordova', function () {
    // Do JS build
    var webpackStream = gulp.src('src/**').pipe(gWebpack(webpackCordovaConfig));

    webpackStream = webpackStream.pipe(gulp.dest('build-cordova/www/assets'));

    return webpackStream;
});

gulp.task('build-html-cordova', function () {
    gulp.src('./src/cordova/resources/**/*')
        .pipe(gulp.dest('./build-cordova/resources'));

    gulp.src('./src/cordova/config.xml')
        .pipe(gulp.dest('./build-cordova'));

    gulp.src('./src/cordova/index.template.html')
        .pipe(rename('index.html'))
        .pipe(gulp.dest('./build-cordova/www'));

    gulp.src('./src/lib/**/*')
        .pipe(gulp.dest('./build-cordova/www/lib'));
});

gulp.task('initCordova', function() {
    runSequence('deleteCordova', 'cordovaBuild', 'waitCordovaBuild');
});

gulp.task('cordova-plugins', function() {
    return chdir.to(cordovaBuildDir).then(function() {
        return cdv.plugins('add', cordovaPlugins);
    });
});

gulp.task('cordova-resource', function(callback) {
    chdir.to(cordovaBuildDir).then(function() {
        run('ionic resources').exec(undefined, callback);
    });
});

gulp.task('cordova-platforms', function() {
    return chdir.to(cordovaBuildDir).then(function() {
        return cdv.platform('add', platformDirs);
    });
});

gulp.task('cordova-prepare', function() {
    return chdir.to(cordovaBuildDir).then(function() {
        return cdv.prepare();
    });
});

gulp.task('cordova-build', function() {
    console.log()
    return chdir.to(cordovaBuildDir).then(function() {
        return cdv.build();
    });
});

gulp.task('waitCordovaBuild', function() {
    setTimeout(function() {
        runSequence('cordova-plugins', 'cordova-platforms', 'cordova-resource', 'cordova-prepare', 'cordova-build');
    }, 200);
});

gulp.task('cordova-release', function() {
    return chdir.to(cordovaBuildDir).then(function() {
        return cdv.build({options: ['--release']});
    });
});

gulp.task("cordovaBuild", function (callback) {
    runSequence('build-js-cordova', 'build-html-cordova', callback);
});

gulp.task('deleteCordova', function(callback) {
    del(['build-cordova/plugins', 'build-cordova/platforms', 'build-cordova/www/assets'], function() {
        callback();
    });
});

/* THREE MAIN TASK */
gulp.task('initCordova', function() {
    runSequence('deleteCordova', 'cordovaBuild', 'waitCordovaBuild');
});

gulp.task('runCordova', function() {
    return chdir.to(cordovaBuildDir).then(function() {
        return cdv.run({platforms:[testPlatform], options:['--device']});
    });
});

gulp.task('emulateCordova', function() {
    return chdir.to(cordovaBuildDir).then(function() {
        return cdv.emulate({platforms:[testPlatform]});
    });
});