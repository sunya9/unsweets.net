import webpack from 'webpack'
import path from 'path'
import ExtractTextPlugin from 'extract-text-webpack-plugin'

const extractCSS = new ExtractTextPlugin('css/[name].css')

const config = {
  entry: './js/main',
  output: {
    path: path.join(__dirname, 'build'),
    publicPath: '/',
    filename: 'js/[name].js'
  },
  plugins: [
    extractCSS,
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
        test: /\.css$/,
        loader: extractCSS.extract(['css', 'postcss'])
      }, {
        test: /\.(png|jpe?g|gif|svg)$/,
        loader: 'url-loader'
      }
    ]
  },
  postcss: [
    require('postcss-import'),
    require('postcss-cssnext'),
  ],
  'devtool': 'source-map'
}

export default config
