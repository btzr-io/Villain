const path = require('path')
const webpack = require('webpack')
const TerserJSPlugin = require('terser-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

const buildDirectory = path.resolve(__dirname, 'dist')

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    path: buildDirectory,
    filename: 'bundle.js',
    chunkFilename: '[name].chunk.js',
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
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
    ],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src/'),
    },
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'style.css',
    }),
    new HtmlWebpackPlugin({
      hash: true,
      title: 'Villain',
      minify: false,
      meta: {
        viewport: 'width=device-width, user-scalable=no, initial-scale=1',
        keywords: 'villlain, reader, comic, comic book, web',
        type: {
          content: 'website',
          property: 'og:type',
        },
        title: {
          name: 'title',
          content: 'Villain',
          property: 'og:title',
        },
        description: {
          name: 'description',
          content:
            "The open source web-based comic book reader that you need, but don't deserve.",
          property: 'og:description',
        },
      },
    }),
  ],

  externals: {
    // 'react': 'react', // Case matters here
    // 'react-dom' : 'reactDOM' // Case matters here
  },
  optimization: {
    minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
  },
}
