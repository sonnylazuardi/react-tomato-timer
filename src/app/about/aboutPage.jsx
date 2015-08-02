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
          About Tomato Timer
        </h1>

        <p>
          The time management technique created by Francesco Cirillo for a more productive way to work and study. <a href="http://pomodorotechnique.com/">More ...</a>
        </p>

        <ul>
          <li>Decide on the task at hand</li>
          <li>Set the Pomodoro (timer) to 25 minutes</li>
          <li>Work on the task until the timer expires;</li>
          <li>Take a Short Break (5 minutes)</li>
        </ul>

        
        <RaisedButton label="Back to clock" onClick={this.handleTransition} />
        <RaisedButton label="by @sonnylazuardi" href="http://sonnylab.com/"/>
      </div>
    );
  }
});

module.exports = About;