import React from 'react';

import 'stylesheets/Appfooter.scss';

const Appfooter = () => (
  <footer className="page-footer light-blue" id="Appfooter">
    <div className="container">
      <div className="row">
        <div className="col s7">
          <img src="https://avatars1.githubusercontent.com/u/9621533?v=3&s=200" className="avatars" />
          <p className="white-text intro">Hi, there! I'm Jason, and I'm studying computer science in Guangdong University of Technology. I do addicted to programming and front-end. This website is the side prodoct when I learn data structures and algorithms, awesome, right? star if you like.  :^)</p>
        </div>
        <div className="col s2 offset-s1">
          <h5 className="white-text">Contact Me!</h5>
          <ul className="contact-links">
            <li><a className="white-text" href="https://github.com/L-movingon">GitHub</a></li>
            <li><a className="white-text" href="https://l-movingon.github.io">Blog</a></li>
            <li><a className="white-text" href="mailto:lmovingon2014@gmail.com">Email</a></li>
          </ul>
        </div>
      </div>
    </div>
    <div className="footer-copyright light-blue darken-1">
      <div className="container">
      Copyright © 2016 Jason Liao
      </div>
    </div>
  </footer>
);

export default Appfooter;
