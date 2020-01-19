const prod = process.env.NODE_ENV === 'production'

const config = {
  plugins: [
    require('postcss-import')(),
    require('postcss-preset-env')()
  ]
}

if (prod)
  config.plugins.push(require('cssnano')({
    preset: [
      'default', {
        autoprefixer: false
      }
    ]
  }))

module.exports = config
