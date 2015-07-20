import React from 'react';
import Service from './Service';

export default class ServiceChooser extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      total: 0
    };
  }
  addTotal (price) {
    this.setState({
      total: this.state.total + price
    });
  }
  render () {
    var services = this.props.items.map((s) => {
      return (
        <Service name={s.name} price={s.price} active={s.active} addTotal={this.addTotal.bind(this)} />
      );
    });
    return (
      <div>
        <h1>Our service</h1>
        <div id="services">
          {services}
          <p id="total">Total <b>${this.state.total.toFixed(2)}</b></p>
        </div>
      </div>
    );
  }
}
