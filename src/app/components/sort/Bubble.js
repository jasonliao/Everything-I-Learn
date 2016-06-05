import React from 'react';
import d3 from 'd3';
import { connect } from 'react-redux';

import Sortutil from './Sortutil';

import 'stylesheets/Bubble.scss';

class Bubble extends React.Component {
  constructor (props) {
    super(props);
    this.canvas
    this.barsContainer;
    this.bars;
  }

  componentDidMount () {
    this.initialBars(this.props.randomArray);
  }

  componentDidUpdate () {
    this.initialBars(this.props.randomArray);
  }

  initialBars (randomArray) {
    this.canvas = d3.select('svg');
    this.barsContainer = d3.select('g');

    d3.selectAll('.bar').remove();

    this.bars = this.barsContainer.selectAll('.bar').data(randomArray).enter().append('g').attr('class', 'bar');

    this.bars.append('rect')
      .attr('width', 40)
      .attr('height', function (d) { return d * 3; })
      .attr('x', function (d, i) { return i * 45; })
      .attr('y', function (d) { return (d3.max(randomArray) - d) * 3; })
      .attr('fill', '#b2dfdb')

    this.bars.append('text')
      .attr('x', function (d, i) { return i * 45 + 12; })
      .attr('y', function (d) { 
        if (d < 9) {
          return (d3.max(randomArray) - d - 2) * 3; 
        } else {
          return  (d3.max(randomArray) - 3) * 3
        }
      })
      .attr('fill', '#444')
      .text(function (d) { return d; });

    const barsContainerSize = this.barsContainer.node().getBBox(),
          canvasWidth = parseFloat(this.canvas.style('width')),
          canvasHeight = parseFloat(this.canvas.style('height')),
          moveX = (canvasWidth - barsContainerSize.width) / 2,
          moveY = (canvasHeight - barsContainerSize.height) / 2;

    this.barsContainer.attr('transform', `translate(${moveX}, ${moveY})`);
  }

  bubbleSort () {
    const rectsLength = this.bars.size();
    const randomArray = this.props.randomArray;
    let indexArray = new Array(rectsLength).fill(0).map((d, i) => {
      return i;
    });
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
          console.log(group.data());
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
      <div id="Bubble">
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
