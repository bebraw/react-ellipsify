'use strict';
var React = require('react/addons');
var cloneWithProps = React.addons.cloneWithProps;

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

    getInitialState() {
        return {
            visible: false,
        };
    },

    render() {
        var visible = this.state.visible;

        var moreClass = this.props.moreClass;
        var moreContent = this.props.more;

        return (
            <div>{visible?
                this.props.children:
                [
                    ellipsify(this.props),
                    <span key='more' className={moreClass} onClick={this.onClick}>{moreContent}</span>
                ]
            }</div>
        );
    },

    onClick() {
        this.setState({
            visible: true,
        });
    },
});

function ellipsify(options) {
    return traverse(options.children, {
        visible: 0,
    });

    function traverse(children, memo) {
        var ret = [];

        React.Children.forEach(children, (child) => {
            var grandChildren = child && child.props && child.props.children;
            var c;

            if(grandChildren) {
                var newChildren = traverse(grandChildren, memo);

                if(newChildren && newChildren.length) {
                    c = cloneWithProps(child);

                    c.props.children = newChildren;

                    ret.push(c);
                }
            }
            else {
                var partsLeft = options.visibleItems - memo.visible;

                if(!partsLeft) {
                    return;
                }

                var parts = child.split(options.separator);
                var len = parts.length;

                // longer section than parts left, go to zero and slice
                if(len > partsLeft) {
                    // slice + combine, memo to max
                    memo.visible = options.visibleItems;

                    var extra = parts[0]? 0: 1;

                    ret.push(parts.slice(0, partsLeft + extra).join(options.separator));
                }
                // excess parts left, add to memo and return whole
                else if(len) {
                    memo.visible += len;

                    ret.push(parts.join(options.separator));
                }
            }
        });

        return ret;
    }
}
