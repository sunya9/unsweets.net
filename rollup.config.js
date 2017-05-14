import resolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import uglify from 'rollup-plugin-uglify'

const config = {
  entry: 'src/js/main.js',
  dest: 'build/js/main.js',
  plugins: [
    resolve(),
    commonjs(),
    babel({
      exclude: 'node_modules/**'
    })
  ]
}

if(process.env.NODE_ENV === 'production') {
  config.plugins.push(uglify())
}

export default config
