const WebpackDevServer = require('webpack-dev-server')
const webpack = require('webpack')
const config = require('./webpack.config.dev')
const compiler = webpack(config)

const server = new WebpackDevServer(compiler, {
  hot: true,
  stats: {
    colors: true
  },
  noInfo: true
})

server.listen(3001)
