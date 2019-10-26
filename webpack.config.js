const path = require('path')
const express = require('express')
const webpack = require('webpack')

const buildDirectory = path.resolve(__dirname, 'build')
const exampleDirectory = path.resolve(__dirname, 'examples')

module.exports = {
  entry: './examples/index.js',
  output: {
    path: exampleDirectory,
    publicPath: '/',
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
    contentBase: exampleDirectory,
    publicPath: '/build',
    port: 8080,
    before(app, server) {
      app.use('/build', express.static(buildDirectory))
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src/'),
    },
  },
}
