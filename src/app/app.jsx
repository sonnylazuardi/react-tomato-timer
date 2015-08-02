var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var Link = Router.Link;
var RouteHandler = Router.RouteHandler;
var DefaultRoute = Router.DefaultRoute;

// material ui theme depedency and setting 
var injectTapEventPlugin = require("react-tap-event-plugin");

var ThemeManager = require('material-ui/lib/styles/theme-manager')();
var Colors = require('material-ui/lib/styles/colors');

var Header = require('./header');
var AboutPage = require('./about/aboutPage.jsx');
var ClockPage = require('./clock/clockPage.jsx');

require("../style/style.scss");

injectTapEventPlugin();

var App = React.createClass({
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  getChildContext: function() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },

  componentWillMount: function() {
    ThemeManager.setPalette({
      accent1Color: Colors.grey50,
    });
  },

  render: function() {
    return (
      <div className="app"> 
        <Header />
        
        <div className="page">
          <RouteHandler/>
        </div>
      </div>
    );
  }
});

var routes = (
  <Route name="app" handler={App} path="/">
    <Route name="about" path="/about" handler={AboutPage}/>
    <Route name="clock" path="/clock" handler={ClockPage}/>
    <DefaultRoute handler={ClockPage} />
  </Route>
);

Router.run(routes, function(Handler, state) {
  React.render(<Handler />, document.body);
})