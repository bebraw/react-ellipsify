'use strict';
var React = require('react/addons');


module.exports = React.createClass({
    displayName: 'More',

    propTypes: {
        more: React.PropTypes.string,
        moreClass: React.PropTypes.string,
    },

    getDefaultProps() {
        return {
            more: '…',
            moreClass: 'more',
        };
    },

    render() {
        return (
            <a href='#' key='more' className={this.props.moreClass} {...this.props}>
                {this.props.more}
            </a>
        );
    },
});
