const path = require('path')
const webpack = require('webpack')

const context = path.join(__dirname, 'themes/hanayo')
const config = {
  context,
  entry: [
    'webpack-dev-server/client?http://localhost:3001',
    'webpack/hot/dev-server',
    path.join(context, './_source/js/main')
  ],
  output: {
    path: path.join(context, 'source'),
    publicPath: '/',
    filename: 'js/main.js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]
  ,
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel'
      },
      {
        test: /\.css$/,
        loaders: ['style', 'css?sourceMap', 'postcss']
      }
    ]
  },
  postcss: [
    require('postcss-import')({
      plugins: [
        require('stylelint')
      ]
    }),
    require('postcss-cssnext'),
    require('postcss-reporter')({
      clearMessages: true
    })
  ],
  devtool: 'source-map'
}

module.exports = config
