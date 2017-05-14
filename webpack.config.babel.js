import path from 'path'
import ExtractTextPlugin from 'extract-text-webpack-plugin'

const config = {
  entry: './js/main',
  output: {
    path: path.join(__dirname, 'build'),
    publicPath: '/',
    filename: 'js/[name].js'
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
      }, {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', {
            loader: 'postcss-loader',
            options: {
              plugins: () => [
                require('postcss-import')(),
                require('postcss-cssnext')(),
              ]
            }
          }]
        })
      }, {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: 'url-loader'
      }
    ]
  },
  'devtool': 'source-map'
}

export default config
