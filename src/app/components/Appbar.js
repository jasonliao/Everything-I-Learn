import React from 'react';
import { bindActionCreators } from 'redux';
import { connect} from 'react-redux';

import { changeSortType } from '../actions';

import 'stylesheets/Appbar.scss';

const Appbar = ({
  changeSortType
}) => (
  <nav id="Appbar" className="light-blue">
    <div className="nav-wrapper">
      <a href="javascript:void(0)" className="brand-logo" onClick={() => {
        changeSortType('');
      }}>Visualize Data Structures</a>
    </div>
  </nav>
);

const mapDispatchsToProps = (dispatch) => {
  return {
    changeSortType: bindActionCreators(changeSortType, dispatch)
  }
};

export default connect(null, mapDispatchsToProps)(Appbar);
