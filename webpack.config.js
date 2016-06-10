'use strict';

const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const config = {
  entry: {
    'js/main.js': './js/main',
    'js/sudoku-solver/main.js': './js/sudoku-solver/main',
    'css/main': './sass/main.scss',
    'css/sudoku-solver/main': './sass/sudoku-solver/main.scss'
  },
  output: {
    path: path.join(__dirname, '/build'),
    publicPath: '/',
    filename: '[name]'
  },
  plugins: [
    new ExtractTextPlugin('[name].css'),
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
        loader: ExtractTextPlugin.extract('style', 'css!postcss!sass')
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
