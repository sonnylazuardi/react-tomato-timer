var React = require('react');
var Router = require('react-router');
var RaisedButton = require('material-ui').RaisedButton;
var FloatingActionButton = require('material-ui').FloatingActionButton;
var Colors = require('material-ui/lib/styles/colors');

var Clock = require('./clock');

var ClockPage = React.createClass({
    contextTypes: {
        router: React.PropTypes.func.isRequired,
    },

    getMaxTime: function(isBreak) {
        if (isBreak) {
            return 5 * 60 * 1000;
        } else {
            return 25 * 60 * 1000;
        };
    },

    getInitialState: function () {
        return {
            isPlaying: false,
            isBreak: false,
            time: this.getMaxTime(),
            maxtime: this.getMaxTime(),
        };
    },

    timeOver: function() {
        this.setState({
            isBreak: !this.state.isBreak, 
            maxtime: this.getMaxTime(!this.state.isBreak),
            time: this.getMaxTime(!this.state.isBreak),
        });
    },

    startTimer: function() {
        var _this = this;
        return window.setInterval(function () {
            if (_this.state.time > 0) {
                _this.setState({
                    time: _this.state.time-1000
                });
            } else {
                _this.timeOver();
            }
        }, 1000);
    },

    handleTransition: function() {
        this.context.router.transitionTo('clock');
    },

    handleStart: function() {
        this.setState({
            isPlaying: !this.state.isPlaying
        });
    },

    handleReset: function() {
        this.setState({
            time: this.state.maxtime,
            isPlaying: false
        });
    },

    componentDidUpdate: function(prevProps, prevState) {
        if (this.state.isPlaying) {
            if (!this.timer)
                this.timer = this.startTimer();
        } else {
            window.clearInterval(this.timer);
            this.timer = null;
        }
    },

    componentDidMount: function() {
        
    },

    componentWillUnmount: function() {
        window.clearInterval(this.timer);
        this.timer = null;
    },

    getIconName: function() {
        if (this.state.isPlaying) {
            return 'fa fa-pause';
        } else {
            return 'fa fa-play';
        }
    },

    getPageName: function() {
        if (this.state.isBreak) {
            return 'full-page full-red';
        } else {
            return 'full-page full-blue';
        }
    },

    getBreakName: function() {
        if (this.state.isBreak) {
            return 'fa fa-briefcase';
        } else {
            return 'fa fa-coffee';
        }
    },

    handleBreak: function() {
        this.setState({
            isBreak: !this.state.isBreak, 
            maxtime: this.getMaxTime(!this.state.isBreak),
            time: this.getMaxTime(!this.state.isBreak),
        });
    },

    render: function() {
        return (
            <div className={this.getPageName()}>
                <Clock time={this.state.time} maxtime={this.state.maxtime} />

                <div className="floating">
                    <span className="item">
                        <FloatingActionButton iconClassName={this.getIconName()} iconStyle={{color: '#00bcd4'}} onClick={this.handleStart} />
                    </span>
                    <span className="item">
                        <FloatingActionButton iconClassName="fa fa-refresh" iconStyle={{color: '#00bcd4'}} onClick={this.handleReset} />
                    </span>
                    <span className="item">
                        <FloatingActionButton iconClassName={this.getBreakName()} iconStyle={{color: '#00bcd4'}} onClick={this.handleBreak} />
                    </span>
                </div>
            </div>
        );
    }
});

module.exports = ClockPage;