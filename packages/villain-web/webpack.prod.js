const path = require('path')
const webpack = require('webpack')
const TerserJSPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const buildDirectory = path.resolve(__dirname, 'dist')

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    path: buildDirectory,
    publicPath: '',
    filename: 'bundle.js',
    chunkFilename: '[name].[chunkhash].js'
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
       filename: "[name].css",
   }),
   new HtmlWebpackPlugin()
 ],
 externals: {
 // 'react': 'react', // Case matters here
 // 'react-dom' : 'reactDOM' // Case matters here
},
 optimization: {
  minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
  splitChunks: {
     cacheGroups: {
       styles: {
         name: 'styles',
         test: /\.css$/,
         chunks: 'all',
         enforce: true,
       },
     },
   },
 },
}
