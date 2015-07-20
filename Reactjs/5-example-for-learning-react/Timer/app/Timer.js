import React from 'react';

export default class Timer extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      elapsed: 0
    };
    this.timer = setInterval(this.tick.bind(this), 50);
  }
  componentWillUnmount () {

    // This method is called immediately before the component is removed
    // form the page and destroyed. We can clear the interval here.

    clearInterval(this.timer);
  }
  tick () {

    // This function is called every 50 ms. It undates the
    // elapsed counter. Calling setState causes the component to be re-rendered

    this.setState({
      elapsed: new Date() - this.props.start
    });
  }
  render () {
    let elapsed = Math.round(this.state.elapsed / 100);

    // This will give a number with one digit after the decimal dot (xx.x)
    let seconds = (elapsed /10).toFixed(1);

    // Although we return an entire <p> element, react will smartly update
    // only the changed parts, which contain the seconds variable
    return <p>This example was started <b>{seconds} seconds</b> ago.</p>;
  }
}
