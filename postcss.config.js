const prod = process.env.NODE_ENV === 'production'

const config = {
  plugins: [
    require('postcss-import')(),
    require('postcss-cssnext')()
  ]
}

if (prod)
  config.plugins.push(require('cssnano')({
    autoprefixer: false
  }))

module.exports = config
