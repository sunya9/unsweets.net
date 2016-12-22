const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const context = path.join(__dirname, 'themes/hanayo')
const config = {
  context,
  entry: './_source/js/main',
  output: {
    path: path.join(context, 'source'),
    publicPath: '/',
    filename: 'js/main.js'
  },
  plugins: [
    new ExtractTextPlugin('css/main.css')
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel'
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract(['css?minimize', 'postcss'])
      }
    ]
  },
  postcss: [
    require('postcss-import'),
    require('postcss-cssnext')
  ]
}

module.exports = config
