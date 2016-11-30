import webpack from 'webpack'
import path from 'path'
import ExtractTextPlugin from 'extract-text-webpack-plugin'

const extractCSS = new ExtractTextPlugin('[name]')

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
        test: /\.scss$/,
        loader: extractCSS.extract(['css', 'postcss', 'sass'])
      }, {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf)$/,
        loader: 'url-loader?limit=100000'
      }
    ]
  },
  postcss : [
    require('autoprefixer')
  ]
}

export default config
