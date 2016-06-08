import React from 'react';
import d3 from 'd3';
import { connect } from 'react-redux';

import Sortutil from './Sortutil';
import Base from './Base';

class Selection extends Base {
  constructor (props) {
    super(props);
  }

  selectSorted () {
    const rectsLength = this.bars.size(); // sort array length
    const randomArray = this.props.randomArray; // origin array
    let indexArray = new Array(rectsLength).fill(0).map((d, i) => {
      return i;
    }); // index array
    let i = 0, j = i + 1, min, cur, prevCur;
    setInterval(() => {
      if (i < rectsLength - 1) {
        if (!min) {
          min = this.bars.filter(function (d, index) {
            return index == indexArray[i];
          });
        }
        if (j < rectsLength) {
          if (j != i + 1) {
            prevCur.attr('class', 'bar');
          }
          cur = this.bars.filter(function (d, index) { 
            return index == indexArray[j]
          });
          debugger;
          console.log(min);
          console.log(cur);
          min.attr('class', 'highlight bar');
          cur.attr('class', 'highlight bar');
          if (min.data() > cur.data()) {
            prevCur = min;
            min = cur;
            min.attr('class', 'selected highlight bar');
          } else { 
            min.attr('class', 'selected highlight bar');
            prevCur = cur; 
          }
          j++;
        } else {
          // exchange two index
          i++;
          j = i + 1;
        }
      } else {
        
      }
    }, 1000);
  }

  render () {
    let { randomArray, isAsc } = this.props;
    return (
      <div id="Selection" className="svg-container">
        <svg className="canvas">
          <g className="bars-container"></g>
        </svg>
        <Sortutil randomArray={randomArray} isAsc={isAsc} onStartClick={this.selectSorted.bind(this)}/>
      </div>
    )
  }
};

const mapStateToProps = ({ randomArray, isAsc }) => {
  return {
    randomArray,
    isAsc
  };
};

export default connect(mapStateToProps)(Selection);
