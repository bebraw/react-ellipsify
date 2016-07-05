require('purecss/build/pure.css');
require('highlight.js/styles/github.css');
require('react-ghfork/gh-fork-ribbon.ie.css');
require('react-ghfork/gh-fork-ribbon.css');
require('./main.css');
require('../style.css');

const React = require('react');
const ReactDOM = require('react-dom');
const App = require('./app.jsx');

main();

function main() {
  const app = document.createElement('div');

  document.body.appendChild(app);

  ReactDOM.render(<App />, app);
}
