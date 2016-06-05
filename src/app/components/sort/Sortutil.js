import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { changeSrotArray, changeAsc } from '../../actions';

import 'stylesheets/Sortutil.scss';

class Sortutil extends React.Component {
  constructor (props) {
    super(props);
  }

  componentDidMount () {
    this.input.value = this.props.randomArray;
    this.checkInput.checked = !this.props.isAsc;
  }

  componentDidUpdate () {
    this.input.value = this.props.randomArray;
    this.checkInput.checked = !this.props.isAsc;
  }

  render () {
    return (
      <div id="Sortutil">
        <button className="btn waves-effect waves-light pull-left" onClick={(event) => {
          this.props.changeSrotArray();
        }}>Random</button>
        <input 
          placeholder="Your unsorted array"
          type="text"
          className="validate input-array"
          ref={(input) => this.input = input} 
          onBlur={(event) => {
            const value = event.target.value;
            const array = value.split(',');
            this.props.changeSrotArray(array);
          }}
        />
        <div className="switch">
          <label>
            Ascending
            <input type="checkbox" onChange={this.props.changeAsc} ref={(input) => this.checkInput = input} />
            <span className="lever"></span>
            Descending
          </label>
        </div>
        <a className="btn-floating btn-large waves-effect waves-light red" onClick={this.props.onStartClick}>▶</a>
      </div>
    );
  }
}

const mapDispatchsToProps = (dispatch) => {
  return {
    changeSrotArray: bindActionCreators(changeSrotArray, dispatch),
    changeAsc: bindActionCreators(changeAsc, dispatch)
  };
};

export default connect(null, mapDispatchsToProps)(Sortutil);
