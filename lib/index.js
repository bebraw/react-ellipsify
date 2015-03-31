'use strict';
var React = require('react/addons');

// this should be the entry point to your library
module.exports = React.createClass({
    displayName: 'Ellipsify',

    propTypes: {
        visibleItems: React.PropTypes.number,
        separator: React.PropTypes.string,
        more: React.PropTypes.string,
        moreClass: React.PropTypes.string,
        atFront: React.PropTypes.bool,
    },

    getDefaultProps() {
      return {
        visibleItems: 5,
        separator: ' ',
        more: '…',
        moreClass: 'more',
        atFront: true,
      };
    },

    render() {
        return <div>Ellipsify!</div>;
    },
});
