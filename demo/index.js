'use strict';

require('purecss/build/pure.css');
require('highlight.js/styles/github.css');
require('react-ghfork/gh-fork-ribbon.ie.css');
require('react-ghfork/gh-fork-ribbon.css');
require('./main.css');
require('../style.css');

var React = require('react');
var ReactDOM = require('react-dom');
var App = require('./app.jsx');

main();

function main() {
  const app = document.createElement('div');

  document.body.appendChild(app);

  ReactDOM.render(<App />, app);
}
