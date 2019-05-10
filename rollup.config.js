import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import replace from 'rollup-plugin-replace'

export default {
  input: './src/index.js',

  output: {
    file: './build/villain.js',
    name: 'villain',
    format: 'umd',
    globals: {
      react: 'React',
      'react-dom': 'ReactDOM',
    },
  },

  plugins: [
    babel({
      exclude: 'node_modules/**',
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
    resolve(),
    commonjs(),
  ],

  external: ['react', 'react-dom', ''],
}
