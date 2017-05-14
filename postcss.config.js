const config = {
  plugins: [
    require('postcss-import'),
    require('postcss-cssnext'),
  ]
}

if(process.env.NODE_ENV === 'production')
  config.plugins.push(require('cssnano')({
    autoprefixer: false
  }))

module.exports = config
