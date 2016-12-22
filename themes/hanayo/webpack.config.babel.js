const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const webpack = require('webpack')
const extractCSS = new ExtractTextPlugin('css/main.css')
const StyleLintPlugin = require('stylelint-webpack-plugin')

const dev = process.env.NODE_ENV !== 'production'

const cssLoader = dev ? 'css?minimize&sourceMap' : 'css'

const config = {
  entry: [
    './_source/js/main'
  ],
  output: {
    path: path.join(__dirname, 'source'),
    publicPath: '/',
    filename: 'js/main.js'
  },
  plugins: [
    extractCSS,
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
      },
      {
        test: /\.css$/,
        loader: extractCSS.extract([cssLoader, 'postcss'])
      }
    ]
  },
  postcss: [
    require('postcss-import'),
    require('postcss-cssnext')
  ]
}

if(dev) {
  config.entry.unshift('webpack-dev-server/client?http://localhost:3001',
  'webpack/hot/dev-server')
  config.plugins.push(
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new StyleLintPlugin()
    )
  config.devtool = 'sourcemap'
}

module.exports = config
