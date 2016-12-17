const WebpackDevServer = require('webpack-dev-server')
const webpack = require('webpack')
const config = require('./webpack.config.babel')
const compiler = webpack(config)

const server = new WebpackDevServer(compiler, {
  hot: true
});

server.listen(3001)
