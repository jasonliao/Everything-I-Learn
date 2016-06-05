import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { changeSortType } from '../actions';

import 'stylesheets/Menu.scss';

const Menu = ({
  sortType,
  changeSortType
}) => {
  const sorts = ['Bubble', 'Selection', 'Insertion', 'Merge', 'Radix', 'Quick', 'Shell'];
  return (
    <div id="Menu">
      <ul className="collapsible">
        <li>
          <div className="collapsible-header active">Sorting</div>
          <div className="collapsible-body">
            <ul className="collection" onClick={(event) => {
              const current = event.target.innerText;
              if (sortType === current) return;
              changeSortType(current);
            }}> 
              {
                sorts.map((sort, i) => {
                  if (sort === sortType) {
                    return <a href="javascript:void(0)" key={i} className="waves-effect waves-light collection-item active">{sort}</a>
                  }
                  return <a href="javascrupt:void(0)" key={i} className="waves-effect waves-light collection-item">{sort}</a>
                })
              }
            </ul>
          </div>
        </li>
      </ul>
    </div>
  );
};


const mapDispatchsToProps = (dispatch) => {
  return {
    changeSortType: bindActionCreators(changeSortType, dispatch)
  }
};

export default connect(null, mapDispatchsToProps)(Menu);
