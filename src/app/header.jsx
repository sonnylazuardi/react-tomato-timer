var React = require('react');
var AppBar = require('material-ui').AppBar;
var LeftNav = require('material-ui').LeftNav;
var MenuItem = require('material-ui').MenuItem;
var IconButton = require('material-ui').IconButton;
var Colors = require('material-ui/lib/styles/colors');

var Header = React.createClass({
    
    contextTypes: {
        router: React.PropTypes.func,
    },

    _onLeftIconButtonTouchTap: function() {
        this.refs.leftNav.toggle();
    },

    _onLeftNavChange: function(e, key, payload) {
        this.context.router.transitionTo(payload.route);
    },

    getStyles: function() {
        var darkWhite = Colors.darkWhite;
        return {
            footer: {
                backgroundColor: Colors.grey900,
                textAlign: 'center'
            },
            a: {
                color: darkWhite
            },
            p: {
                margin: '0 auto',
                padding: '0',
                color: Colors.lightWhite,
                maxWidth: '335px'
            },
            iconButton: {
                color: darkWhite
            }
        };
    },

    render: function() {
        var menuItems = [
            { type: MenuItem.Types.SUBHEADER, text: 'Pomodoro Timer' },
            { route: 'clock', text: 'Clock Timer' },
            { type: MenuItem.Types.SUBHEADER, text: 'About this app' },
            { route: 'about', text: 'About Tomato Timer' },
            { 
                type: MenuItem.Types.LINK, 
                payload: 'http://pomodorotechnique.com/', 
                text: 'Pomodoro Technique'
            },
            { 
                type: MenuItem.Types.LINK, 
                payload: 'https://github.com/sonnylazuardi/react-tomato-timer', 
                text: 'GitHub'
            },
            { 
                type: MenuItem.Types.LINK, 
                payload: 'http://www.sonnylab.com', 
                text: 'Website' 
            },
        ];
        var styles = this.getStyles();
        var githubButton = (
            <IconButton
                iconStyle={styles.iconButton}
                iconClassName="fa fa-github"
                href="https://github.com/sonnylazuardi/react-tomato-timer"
                linkButton={true} />
        );

        return (
            <div className="nav">
                <AppBar title='Tomato Timer' onLeftIconButtonTouchTap={this._onLeftIconButtonTouchTap} zDepth={0} iconElementRight={githubButton} />

                <LeftNav ref="leftNav" docked={false} menuItems={menuItems} onChange={this._onLeftNavChange} />
            </div>
        );
    }
});

module.exports = Header;