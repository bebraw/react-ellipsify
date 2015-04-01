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

	    getDefaultProps:function() {
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

	    componentWillReceiveProps:function(nextProps) {
	        this.setState({
	            visible: nextProps.visible,
	        });
	    },

	    getInitialState:function() {
	        return {
	            visible: false,
	        };
	    },

	    render:function() {
	        var visible = this.state.visible;

	        var moreClass = this.props.moreClass;
	        var moreContent = this.props.more;
	        var atFront = this.props.atFront;

	        return (
	            React.createElement("div", null, visible?
	                this.props.children:
	                atFront? [
	                    ellipsify(this.props),
	                    React.createElement("span", {key: "more", className: moreClass, onClick: this.onClick}, moreContent),
	                ]:
	                [
	                    React.createElement("span", {key: "more", className: moreClass, onClick: this.onClick}, moreContent),
	                    ellipsify(this.props),
	                ]
	            )
	        );
	    },

	    onClick:function() {
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

	    React.Children.forEach(children, function(child)  {
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

	    React.Children.forEach(children, function(originalChild, i)  {
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


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ }
/******/ ])
});
;