import path from 'path'

const config = {
  context: path.join(__dirname, 'themes/hanayo/source'),
  entry: '_index.js',
  output: {
    path: './',bundle.
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel'
      }
    ]
  }
}
