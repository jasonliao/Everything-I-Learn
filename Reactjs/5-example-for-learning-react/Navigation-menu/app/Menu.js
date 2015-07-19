import React from 'react';

export default class Menu extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      focused: 0
    };
  }
  clicked (index) {
    
    // This click handler will update the state with
    // the index of the focused menu entry

    this.setState({
      focused: index
    });
  }
  render () {

    // Here we will read the items property, which was passed
    // as an attribute when the component was created

    // The map method will loop over the array of menu entries,
    // and will return a new array with <li> elements.

    return (
      <div>
        <ul>{ this.props.items.map((m, index) => {
          var style = '';
          if (this.state.focused == index) {
            style = 'focused';
          }

          return <li className={style} onClick={this.clicked.bind(this, index)}>{m}</li>
        })}
        </ul>

        <p>Selected: {this.props.items[this.state.focused]}</p>
      </div>
    );
  }
}
