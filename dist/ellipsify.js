(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react/addons"));
	else if(typeof define === 'function' && define.amd)
		define(["react/addons"], factory);
	else if(typeof exports === 'object')
		exports["Ellipsify"] = factory(require("react/addons"));
	else
		root["Ellipsify"] = factory(root["react/addons"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var React = __webpack_require__(1);

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
	        children: React.PropTypes.node,
	    },

	    getDefaultProps:function() {
	        return {
	            visible: false,
	            visibleItems: 5,
	            separator: ' ',
	            atFront: false,
	            onShow: noop,
	            moreClass: 'more'
	        };
	    },

	    componentWillReceiveProps:function(nextProps) {
	        this.setState({
	            visible: nextProps.visible,
	            content: ellipsify(nextProps),
	        });
	    },

	    getInitialState:function() {
	        return {
	            visible: false,
	            content: [],
	        };
	    },

	    componentWillMount:function() {
	        this.setState({
	            content: ellipsify(this.props),
	        });
	    },

	    render:function() {
	        var visible = this.state.visible;
	        var atFront = this.props.atFront;

	        if(visible) {
	            return React.createElement("div", null, this.props.children);
	        }

	        var content = this.state.content;
	        var more = React.createElement("div", {key: "more", className: this.props.moreClass, onClick: this.show}, 
	            this.props.more ? this.props.more : '…'
	        );

	        return React.createElement("div", null, atFront? [more, content]: [content, more]);
	    },

	    show:function() {
	        this.setState({
	            visible: true,
	            content: this.props.children,
	        });

	        this.props.onShow();
	    },
	});

	function ellipsify(options) {
	    var traverse = options.atFront? ellipsifyFromBack: ellipsifyFromFront;

	    return traverse(options, options.children, {
	        visible: 0,
	    });
	}

	function ellipsifyFromFront(options, children, memo) {
	    var ret = [];

	    React.Children.forEach(children, function(child, i)  {
	        var grandChildren = child && child.props && child.props.children;
	        var c;

	        if(grandChildren) {
	            var newChildren = ellipsifyFromFront(options, grandChildren, memo);

	            if(newChildren && newChildren.length) {
	                ret.push(
	                    React.cloneElement(child, {key: ("child-" + i)}, newChildren)
	                );
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

	    React.Children.forEach(children, function(originalChild, i)  {
	        var child = Array.isArray(children)? children[children.length - i - 1]: originalChild;
	        var grandChildren = child && child.props && child.props.children;
	        var c;

	        if(grandChildren) {
	            var newChildren = ellipsifyFromBack(options, grandChildren, memo);

	            if(newChildren && newChildren.length) {
	                ret.unshift(
	                    React.cloneElement(child, {key: ("child-" + i)}, newChildren)
	                );
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


/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ }
/******/ ])
});
;