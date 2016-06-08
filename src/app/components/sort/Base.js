import React from 'react';
import d3 from 'd3';

class Base extends React.Component {
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

    d3.selectAll('.bar').remove(); // remove all .bar

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

};

export default Base;
