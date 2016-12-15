'use strict';

var BrowserSyncPlugin = require('browser-sync-webpack-plugin');
var browserSyncConfig = require('./bs-config');

var config = {
  entry: {
    main: ['./src/index.js']
  },
  output: {
    path: __dirname + '/dist',
    library: '[name]',
    libraryTarget: 'umd',
    umdNamedDefine: true,
    filename: '[name].js'
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loaders: ['babel-loader'] },
      { test: /\.json$/, loaders: ['json-loader'] }
    ]
  },
  // most of the time we don't want this bloat
  node: {
    crypto: 'empty',
    net: 'empty',
    dns: 'empty'
  },
  resolve: {
    root: __dirname,
    extensions: ['', '.json', '.js'],
    alias: {
      joi: 'joi-browser'
    }
  },
  plugins: [
    new BrowserSyncPlugin(browserSyncConfig),
  ]
};

module.exports = config;
