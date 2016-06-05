import React from 'react';

import 'stylesheets/About.scss';

const About = () => (
  <div id="About">
    <div className="container">
      <ul className="row">
        <li className="col s4">
          <a href="https://facebook.github.io/react/"><img className="logo react" src="https://lh5.googleusercontent.com/g7p10RSxdGTTzvezZMgGyfNIH2eh7JLQqHPTB-gsRehX26eD9JICKKNISWQFzMEwoBro3vt2u_w=s128-h128-e365"/></a>
        </li>
        <li className="col s4">
          <a href="https://d3js.org/"><img className="logo d3" src="http://ww3.sinaimg.cn/large/7988751agw1f4evahhr6wj205k05k3yh.jpg" /></a>
        </li>
        <li className="col s4">
          <a href="http://materializecss.com/"><img className="logo material" src="http://www.madisonabshire.com/img/tech-svg/Materialize.png" /></a>
        </li>
      </ul>
      <h5>Bulit with React, D3 and Meterialize</h5>
      <h5>Make data structures and algorithms more vivid</h5>
    </div>
  </div>
);

export default About;
