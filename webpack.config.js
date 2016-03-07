'use strict';

const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

let extractSass = new ExtractTextPlugin('css/main.css');

const config = {
  entry: {
    'js/main': './js/main'
  },
  output: {
    path: path.join(__dirname, '/build'),
    publicPath: '/',
    filename: '[name].js'
  },
  plugins: [
    extractSass,
    new webpack.ProvidePlugin({
      $: 'jquery'
    })
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel'
      }, {
        test: /\.scss$/,
        loader: extractSass.extract('css!postcss!sass')
      }, {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf)$/,
        loader: 'url-loader?limit=100000'
      }
    ]
  },
  postcss : [
    require('autoprefixer')
  ]
};

module.exports = config;