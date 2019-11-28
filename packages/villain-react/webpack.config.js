const path = require('path')
const express = require('express')
const webpack = require('webpack')

const buildDirectory = path.resolve(__dirname, 'build')
const devSandboxDirectory = path.resolve(__dirname, 'dev-sandbox')

module.exports = {
  entry: './dev-sandbox/index.js',
  output: {
    path: devSandboxDirectory,
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
    contentBase: devSandboxDirectory,
    publicPath: '/static',
    port: 8080,
    before(app, server) {
      app.use('./dev-sandbox/static', express.static(buildDirectory))
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src/'),
    },
    extensions: ['.js', '.jsx'],
  },
}
