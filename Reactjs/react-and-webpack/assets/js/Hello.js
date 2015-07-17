var React = require('react');

export default class Hello extends React.Component {
  render () {
    return <h1>Hello {this.props.name}!</h1>;
  }
}
