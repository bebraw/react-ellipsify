/* eslint-disable jsx-a11y/no-static-element-interactions, react/no-unused-prop-types */
import React from 'react';

const ellipsify = ({
  visible, visibleItems,
  separator,
  more = '…',
  moreClass,
  atFront,
  onShow,
  children
}) => {
  if (visible) {
    return <div>{children}</div>;
  }

  const moreElement = <div key="more" className={moreClass} onClick={onShow}>{more}</div>;
  const contentElement = ellipsifyContent({
    atFront,
    children,
    visibleItems,
    separator
  });

  return <div>{atFront ? [moreElement, contentElement] : [contentElement, moreElement]}</div>;
};

ellipsify.propTypes = {
  visible: React.PropTypes.bool,
  visibleItems: React.PropTypes.number,
  separator: React.PropTypes.string,
  more: React.PropTypes.node,
  moreClass: React.PropTypes.string,
  atFront: React.PropTypes.bool,
  onShow: React.PropTypes.func,
  children: React.PropTypes.node
};
ellipsify.defaultProps = {
  visible: false,
  visibleItems: 5,
  separator: ' ',
  atFront: false,
  onShow: noop,
  moreClass: 'more'
};

function ellipsifyContent(options) {
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

export default ellipsify;
