const path = require('path')

const context = path.join(__dirname, 'themes/hanayo')
const config = {
  entry: path.join(context, './_source/js/main'),
  output: {
    path: path.join(context, 'source'),
    publicPath: '/',
    filename: 'js/main.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader?sourceMap', 'postcss-loader']
      }
    ]
  },
  devtool: 'source-map'
}

module.exports = config
