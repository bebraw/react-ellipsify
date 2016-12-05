/* eslint-disable jsx-a11y/no-static-element-interactions, react/no-unused-prop-types */
import React from 'react';

class Ellipsify extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      content: []
    };

    this.show = this.show.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      visible: nextProps.visible,
      content: ellipsify(nextProps)
    });
  }
  componentWillMount() {
    this.setState({
      content: ellipsify(this.props)
    });
  }
  render() {
    const visible = this.state.visible;
    const atFront = this.props.atFront;

    if (visible) {
      return <div>{this.props.children}</div>;
    }

    const content = this.state.content;
    const more = (
      <div key="more" className={this.props.moreClass} onClick={this.show}>
        {this.props.more ? this.props.more : '…'}
      </div>
    );

    return <div>{atFront ? [more, content] : [content, more]}</div>;
  }
  show() {
    this.setState({
      visible: true,
      content: this.props.children
    });

    this.props.onShow();
  }
}
Ellipsify.propTypes = {
  visible: React.PropTypes.bool,
  visibleItems: React.PropTypes.number,
  separator: React.PropTypes.string,
  more: React.PropTypes.node,
  moreClass: React.PropTypes.string,
  atFront: React.PropTypes.bool,
  onShow: React.PropTypes.func,
  children: React.PropTypes.node
};
Ellipsify.defaultProps = {
  visible: false,
  visibleItems: 5,
  separator: ' ',
  atFront: false,
  onShow: noop,
  moreClass: 'more'
};

function ellipsify(options) {
  const traverse = options.atFront ? ellipsifyFromBack : ellipsifyFromFront;

  return traverse(options, options.children, {
    visible: 0
  });
}

function ellipsifyFromFront(options, children, memo) {
  const ret = [];

  React.Children.forEach(children, (child, i) => {
    const grandChildren = child && child.props && child.props.children;

    if (grandChildren) {
      const newChildren = ellipsifyFromFront(options, grandChildren, memo);

      if (newChildren && newChildren.length) {
        ret.push(
          React.cloneElement(child, { key: `child-${i}` }, newChildren)
        );
      }
    } else {
      const partsLeft = options.visibleItems - memo.visible;

      if (!partsLeft) {
        return;
      }

      const parts = child.split(options.separator);
      const len = parts.length;

      // longer section than parts left, go to zero and slice
      if (len > partsLeft) {
        // slice + combine, memo to max
        memo.visible = options.visibleItems; // eslint-disable-line no-param-reassign

        const extra = parts[0] ? 0 : 1;

        ret.push(parts.slice(0, partsLeft + extra).join(options.separator));
      } else if (len) { // excess parts left, add to memo and return whole
        memo.visible += len; // eslint-disable-line no-param-reassign

        ret.push(parts.join(options.separator));
      }
    }
  });

  return ret;
}

function ellipsifyFromBack(options, children, memo) {
  const ret = [];

  React.Children.forEach(children, (originalChild, i) => {
    const child = Array.isArray(children) ? children[children.length - i - 1] : originalChild;
    const grandChildren = child && child.props && child.props.children;

    if (grandChildren) {
      const newChildren = ellipsifyFromBack(options, grandChildren, memo);

      if (newChildren && newChildren.length) {
        ret.unshift(
          React.cloneElement(child, { key: `child-${i}` }, newChildren)
        );
      }
    } else {
      const partsLeft = options.visibleItems - memo.visible;

      if (!partsLeft) {
        return;
      }

      const parts = child.split(options.separator);
      const len = parts.length;

      // longer section than parts left, slice from the end
      if (len > partsLeft) {
        // slice + combine, memo to max
        memo.visible = options.visibleItems; // eslint-disable-line no-param-reassign

        ret.push(parts.slice(-partsLeft).join(options.separator));
      } else if (len) { // excess parts left, add to memo and return whole
        memo.visible += len; // eslint-disable-line no-param-reassign

        ret.push(parts.join(options.separator));
      }
    }
  });

  return ret;
}

function noop() {}

export default Ellipsify;
