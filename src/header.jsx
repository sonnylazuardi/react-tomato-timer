var React = require('react');
var AppBar = require('material-ui').AppBar;
var LeftNav = require('material-ui').LeftNav;
var MenuItem = require('material-ui').MenuItem;

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

    render: function() {
        var menuItems = [
            { type: MenuItem.Types.SUBHEADER, text: 'Clock Timer' },
            { route: 'clock', text: 'Pomodoro' },
            { route: 'short', text: 'Short Break' },
            { route: 'long', text: 'Long Break' },
            { type: MenuItem.Types.SUBHEADER, text: 'About this app' },
            { route: 'about', text: 'About Pomodoro Timer' },
            { route: 'technique', text: 'Pomodoro Technique' },
            { 
                type: MenuItem.Types.LINK, 
                payload: 'https://github.com/sonnylazuardi/pomodoro-timer', 
                text: 'GitHub'
            },
            { 
                type: MenuItem.Types.LINK, 
                payload: 'http://www.sonnylab.com', 
                text: 'Website' 
            },
        ];

        return (
            <div className="nav">
                <AppBar title='Pomodoro Timer' onLeftIconButtonTouchTap={this._onLeftIconButtonTouchTap} zDepth={0} />

                <LeftNav ref="leftNav" docked={false} menuItems={menuItems} onChange={this._onLeftNavChange} />
            </div>
        );
    }
});

module.exports = Header;