import resolve from '@rollup/plugin-node-resolve'
import babel from 'rollup-plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import { uglify } from 'rollup-plugin-uglify'
import serve from 'rollup-plugin-serve'


const dev = process.env.NODE_ENV !== 'production'

const config = {
  input: 'src/js/main.js',
  output: {
    file: 'build/js/main.js',
    format: 'iife',
    sourcemap: dev
  },
  plugins: [
    resolve(),
    commonjs(),
    babel({
      exclude: 'node_modules/**'
    })
  ]
}

if (dev) {
  config.plugins.push(serve({
    contentBase: ['static', 'build']
  }))
} else {
  config.plugins.push(uglify())
}

export default config
