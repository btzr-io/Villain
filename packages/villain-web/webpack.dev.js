const path = require('path')
const webpack = require('webpack')
const devServerDirectory = path.resolve(__dirname, 'dev-server')

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: devServerDirectory,
    publicPath: '/bundles/',
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(s*)css$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  devServer: {
    port: 8080,
    contentBase: devServerDirectory,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src/'),
    },
    extensions: ['.js', '.jsx'],
  },
}
