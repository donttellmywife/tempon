const Compress = require('compression-webpack-plugin')
const CSS = require('mini-css-extract-plugin')
const { DefinePlugin } = require('webpack')

const { smart } = require('webpack-merge')
const common = require('./config.js')
module.exports = smart({
  mode: 'production',

  devtool: false,

  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: [CSS.loader]
      },
    ],
  },

  plugins: [
    new Compress(),
    // creates gzip
    new CSS(),
    new DefinePlugin({
      USER_API: JSON.stringify('http://139.59.136.63:4001'),
    }),
  ],
}, common)
