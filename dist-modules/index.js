'use strict';
var React = require('react');

module.exports = React.createClass({
    displayName: 'Ellipsify',

    propTypes: {
        visible: React.PropTypes.bool,
        visibleItems: React.PropTypes.number,
        separator: React.PropTypes.string,
        more: React.PropTypes.node,
        moreClass: React.PropTypes.string,
        atFront: React.PropTypes.bool,
        onShow: React.PropTypes.func,
        children: React.PropTypes.node
    },

    getDefaultProps: function getDefaultProps() {
        return {
            visible: false,
            visibleItems: 5,
            separator: ' ',
            atFront: false,
            onShow: noop,
            moreClass: 'more'
        };
    },

    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
        this.setState({
            visible: nextProps.visible,
            content: ellipsify(nextProps)
        });
    },

    getInitialState: function getInitialState() {
        return {
            visible: false,
            content: []
        };
    },

    componentWillMount: function componentWillMount() {
        this.setState({
            content: ellipsify(this.props)
        });
    },

    render: function render() {
        var visible = this.state.visible;
        var atFront = this.props.atFront;

        if (visible) {
            return React.createElement(
                'div',
                null,
                this.props.children
            );
        }

        var content = this.state.content;
        var more = React.createElement(
            'div',
            { key: 'more', className: this.props.moreClass, onClick: this.show },
            this.props.more ? this.props.more : '…'
        );

        return React.createElement(
            'div',
            null,
            atFront ? [more, content] : [content, more]
        );
    },

    show: function show() {
        this.setState({
            visible: true,
            content: this.props.children
        });

        this.props.onShow();
    }
});

function ellipsify(options) {
    var traverse = options.atFront ? ellipsifyFromBack : ellipsifyFromFront;

    return traverse(options, options.children, {
        visible: 0
    });
}

function ellipsifyFromFront(options, children, memo) {
    var ret = [];

    React.Children.forEach(children, function (child, i) {
        var grandChildren = child && child.props && child.props.children;
        var c;

        if (grandChildren) {
            var newChildren = ellipsifyFromFront(options, grandChildren, memo);

            if (newChildren && newChildren.length) {
                ret.push(React.cloneElement(child, { key: 'child-' + i }, newChildren));
            }
        } else {
            var partsLeft = options.visibleItems - memo.visible;

            if (!partsLeft) {
                return;
            }

            var parts = child.split(options.separator);
            var len = parts.length;

            // longer section than parts left, go to zero and slice
            if (len > partsLeft) {
                // slice + combine, memo to max
                memo.visible = options.visibleItems;

                var extra = parts[0] ? 0 : 1;

                ret.push(parts.slice(0, partsLeft + extra).join(options.separator));
            }
            // excess parts left, add to memo and return whole
            else if (len) {
                    memo.visible += len;

                    ret.push(parts.join(options.separator));
                }
        }
    });

    return ret;
}

function ellipsifyFromBack(options, children, memo) {
    var ret = [];

    React.Children.forEach(children, function (originalChild, i) {
        var child = Array.isArray(children) ? children[children.length - i - 1] : originalChild;
        var grandChildren = child && child.props && child.props.children;
        var c;

        if (grandChildren) {
            var newChildren = ellipsifyFromBack(options, grandChildren, memo);

            if (newChildren && newChildren.length) {
                ret.unshift(React.cloneElement(child, { key: 'child-' + i }, newChildren));
            }
        } else {
            var partsLeft = options.visibleItems - memo.visible;

            if (!partsLeft) {
                return;
            }

            var parts = child.split(options.separator);
            var len = parts.length;

            // longer section than parts left, slice from the end
            if (len > partsLeft) {
                // slice + combine, memo to max
                memo.visible = options.visibleItems;

                ret.push(parts.slice(-partsLeft).join(options.separator));
            }
            // excess parts left, add to memo and return whole
            else if (len) {
                    memo.visible += len;

                    ret.push(parts.join(options.separator));
                }
        }
    });

    return ret;
}

function noop() {}