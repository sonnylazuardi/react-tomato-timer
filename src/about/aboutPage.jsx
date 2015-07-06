var React = require('react');
var RaisedButton = require('material-ui/lib/raised-button');
var Router = require('react-router');

var About = React.createClass({
  contextTypes: {
    router: React.PropTypes.func.isRequired,
  },

  handleTransition: function() {
    this.context.router.transitionTo('clock');
  },
  
  render: function() {
    return (
      <div className="padding">
        <h1>
          About Pomodoro Timer
        </h1>

        <p>
          The time management technique created by Francesco Cirillo for a  more productive way to work and study. For more information, click here.
        </p>

        h1  
        <RaisedButton label="Back to clock" onClick={this.handleTransition} />
        <RaisedButton label="by @sonnylazuardi" href="http://sonnylab.com/"/>
      </div>
    );
  }
});

module.exports = About;