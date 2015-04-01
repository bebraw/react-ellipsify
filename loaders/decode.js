'use strict';
var decode = require('ent').decode;


module.exports = function(input) {
    this.cacheable();

    return decode(input);
};
