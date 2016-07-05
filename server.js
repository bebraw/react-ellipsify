/* eslint-disable no-console */
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

const config = require('./config/webpack.config');

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true
}).listen(3000, '0.0.0.0', function (err) {
  if (err) {
    console.log(err);

    return;
  }

  console.log('Listening at 0.0.0.0:3000');
});
