import css from 'rollup-plugin-css-porter'
import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import replace from 'rollup-plugin-replace'
import alias from 'rollup-plugin-alias'
import { terser } from 'rollup-plugin-terser'
import json from 'rollup-plugin-json'
import path from 'path'
import scss from 'rollup-plugin-scss'
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
    css({
      raw: './dist/style.css',
      minified: './dist/style.min.css',
    }),
    scss({
      output: true,

      // Filename to write all styles to
      output: 'style.css',

      output: function(styles, styleNodes) {
        writeFileSync('style.css', styles)
      },

      // Disable any style output or callbacks, import as string
      output: false,

      // Determine if node process should be terminated on error (default: false)
      failOnError: true,
    }),
    babel({
      exclude: 'node_modules/**',
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
    alias({
      resolve: ['/index.js', '/index.jsx', '.js', '.jsx', '.json'], //optional, by default this will just look for .js files or folders
    }),
    json(),
    resolve(),
    commonjs(),
    terser(),
  ],

  external: ['react', 'react-dom', 'reakit'],
}
