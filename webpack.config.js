const webpack = require('webpack')
const path = require('path')
const shouldAnalyze = process.argv.includes('--analyze')
const plugins = []
if (shouldAnalyze) {
  plugins.push(new BundleAnalyzerPlugin())
}
const nodeEnv = process.env.NODE_ENV || 'development'

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin

const config = {
  mode: nodeEnv,
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist',
    filename: 'bundle.js',
  },
  plugins,
  devServer: {
    contentBase: '.',
  },
}

module.exports = config
