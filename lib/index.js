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
        return <div>{ellipsify(this.props)}</div>;
    },
});

function ellipsify(options) {
    return traverse(options.children, {
        visible: 0,
    });

    function traverse(children, memo) {
        return React.Children.map(children, (child) => {
            var grandChildren = child && child.props && child.props.children;

            if(grandChildren) {
                child.props.children = traverse(grandChildren, memo);
            }
            else {
                var partsLeft = options.visibleItems - memo.visible;

                if(!partsLeft) {
                    return '';
                }

                var parts = child.split(options.separator);
                var len = parts.length;

                // longer section than parts left, go to zero and slice
                if(len > partsLeft) {
                    // slice + combine, memo to max
                    memo.visible = options.visibleItems;

                    var extra = parts[0]? 0: 1;

                    return parts.slice(0, partsLeft + extra).join(options.separator);
                }
                // excess parts left, add to memo and return whole
                else if(len) {
                    memo.visible += len;

                    return parts.join(options.separator);
                }

                return '';
            }

            return child;
        });
    }
}
