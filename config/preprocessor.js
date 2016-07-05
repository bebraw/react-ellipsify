'use strict';

var ReactTools = require('react-tools');


module.exports = {
  process(src) {
    return ReactTools.transform(src, {
      harmony: true
    });
  }
};
