import React from 'react';

export default class Service extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      active: false
    };
  }
  clickHandler () {
    var active = !this.state.active;
    this.setState({
      active: active
    });
    this.props.addTotal(active ? this.props.price : -this.props.price);
  }
  render () {
    return (
      <p className={this.state.active ? 'active' : ''} onClick={this.clickHandler.bind(this)}>
        {this.props.name} <b>${this.props.price.toFixed(2)}</b>
      </p>
    );
  }
}
