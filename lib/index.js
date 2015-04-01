'use strict';
var React = require('react/addons');
var cloneWithProps = React.addons.cloneWithProps;


module.exports = React.createClass({
    displayName: 'Ellipsify',

    propTypes: {
        visible: React.PropTypes.bool,
        visibleItems: React.PropTypes.number,
        separator: React.PropTypes.string,
        more: React.PropTypes.string,
        moreClass: React.PropTypes.string,
        atFront: React.PropTypes.bool,
        onShow: React.PropTypes.func,
    },

    getDefaultProps() {
      return {
        visible: false,
        visibleItems: 5,
        separator: ' ',
        more: '…',
        moreClass: 'more',
        atFront: true,
        onShow: noop,
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
        var atFront = this.props.atFront;

        return (
            <div>{visible?
                this.props.children:
                atFront? [
                    ellipsify(this.props),
                    <span key='more' className={moreClass} onClick={this.onClick}>{moreContent}</span>,
                ]:
                [
                    <span key='more' className={moreClass} onClick={this.onClick}>{moreContent}</span>,
                    ellipsify(this.props),
                ]
            }</div>
        );
    },

    onClick() {
        this.setState({
            visible: true,
        });

        this.props.onShow();
    },
});

function ellipsify(options) {
    var traverse = options.atFront? ellipsifyFromFront: ellipsifyFromBack;

    return traverse(options, options.children, {
        visible: 0,
    });
}

function ellipsifyFromFront(options, children, memo) {
    var ret = [];

    React.Children.forEach(children, (child) => {
        var grandChildren = child && child.props && child.props.children;
        var c;

        if(grandChildren) {
            var newChildren = ellipsifyFromFront(options, grandChildren, memo);

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

function ellipsifyFromBack(options, children, memo) {
    var ret = [];

    React.Children.forEach(children, (originalChild, i) => {
        var child = Array.isArray(children)? children[children.length - i - 1]: originalChild;
        var grandChildren = child && child.props && child.props.children;
        var c;

        if(grandChildren) {
            var newChildren = ellipsifyFromBack(options, grandChildren, memo);

            if(newChildren && newChildren.length) {
                c = cloneWithProps(child);

                c.props.children = newChildren;

                ret.unshift(c);
            }
        }
        else {
            var partsLeft = options.visibleItems - memo.visible;

            if(!partsLeft) {
                return;
            }

            var parts = child.split(options.separator);
            var len = parts.length;

            // longer section than parts left, slice from the end
            if(len > partsLeft) {
                // slice + combine, memo to max
                memo.visible = options.visibleItems;

                ret.push(parts.slice(-partsLeft).join(options.separator));
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

function noop() {}
