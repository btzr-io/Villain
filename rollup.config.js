import css from 'rollup-plugin-css-porter'
import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import replace from 'rollup-plugin-replace'
import alias from 'rollup-plugin-alias'
import path from 'path'
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
      'react-dom': 'ReactDOM',
    },
  },

  plugins: [
    css({
      raw: './dist/style.css',
      minified: './dist/style.min.css',
    }),
    babel({
      exclude: 'node_modules/**',
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
    alias({
      resolve: ['/index.js', '/index.jsx', 'js', 'jsx'], //optional, by default this will just look for .js files or folders
      entries: [{ find: '@', replacement: path.resolve(__dirname, 'src/') }],
    }),
    resolve(),
    commonjs(),
  ],

  external: ['react', 'react-dom', ''],
}
