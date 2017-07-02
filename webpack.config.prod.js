const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const context = path.join(__dirname, 'themes/hanayo')
const config = {
  entry: path.join(context, './_source/js/main'),
  output: {
    path: path.join(context, 'source'),
    publicPath: '/',
    filename: 'js/main.js'
  },
  plugins: [
    new ExtractTextPlugin('css/main.css')
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader?minimize', 'postcss-loader']
        })
      }
    ]
  }
}

module.exports = config
