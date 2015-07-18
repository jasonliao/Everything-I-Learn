var React = require('react');
var Timer = require('./Timer');

React.render(<Timer start={Date.now()} />, document.body);
