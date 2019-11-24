import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import replace from 'rollup-plugin-replace'
import alias from 'rollup-plugin-alias'
import { terser } from 'rollup-plugin-terser'
import json from 'rollup-plugin-json'
import path from 'path'
import postcss from 'rollup-plugin-postcss'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default {
  input: './src/index.js',

  output: {
    file: './dist/villain.js',
    name: 'villain',
    format: 'umd',
    globals: {
      react: 'React',
      reakit: 'reakit',
      'react-dom': 'ReactDOM',
    },
  },

  plugins: [
    postcss({
       extract: './dist/style.css',
       modules: false,
       minimize: true,
    }),
    babel({
      exclude: 'node_modules/**',
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
    alias({
      resolve: ['/index.js', '/index.jsx', '.js', '.jsx', '.json', '.css', '.scss'], //optional, by default this will just look for .js files or folders
    }),
    json(),
    resolve(),
    commonjs(),
    terser(),
  ],

  external: ['react', 'react-dom', 'reakit'],
}
