import React from 'react';
import d3 from 'd3';
import { connect } from 'react-redux';

import Sortutil from './Sortutil';
import Base from './Base';

class Bubble extends Base {
  constructor (props) {
    super(props);
  }

  bubbleSort () {
    const rectsLength = this.bars.size(); // sort array length
    const randomArray = this.props.randomArray; // origin array
    let indexArray = new Array(rectsLength).fill(0).map((d, i) => {
      return i;
    }); // index array
    let i = 0, j = 0, group;
    setInterval(() => {
      if (i < rectsLength - 1) {
        if (j !== 0) {
          group.attr('class', 'bar')
        }
        if (j < rectsLength - 1 - i) {
          group = this.bars.filter(function (d, i) { 
            return i == indexArray[j] || i == indexArray[j + 1];
          });
          group.attr('class', 'highlight bar');
          if (randomArray[indexArray[j]] > randomArray[indexArray[j + 1]]) {
            const temp = indexArray[j + 1];
            indexArray[j + 1] = indexArray[j];
            indexArray[j] = temp;
            group.transition()
              .delay(500)
              .attr('transform', function (d, i) {
                const transfromStyle = d3.select(this).attr('transform');
                let translateX = 0;
                if (transfromStyle !== null) {
                  translateX = parseInt(transfromStyle.match(/\-?\d+/g)[0])
                }
                if (i == 0) {
                  return `translate(${translateX + 45}, 0)`;
                } else {
                  return `translate(${translateX - 45}, 0)`;
                }
              });
          }
          j++;
        } else {
          if (group[0][0].__data__ > group[0][1].__data__) {
            d3.select(group[0][0]).attr('class', 'sorted bar');
          } else {
            d3.select(group[0][1]).attr('class', 'sorted bar');
          }
          i++;
          j = 0;
        }
      } else {
        group.attr('class', 'sorted bar');
      }
    }, 1000);
  }

  render () {
    let { randomArray, isAsc } = this.props;
    return (
      <div id="Bubble" className="svg-container">
        <svg className="canvas">
          <g className="bars-container"></g>
        </svg>
        <Sortutil randomArray={randomArray} isAsc={isAsc} onStartClick={this.bubbleSort.bind(this)}/>
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

export default connect(mapStateToProps)(Bubble);
