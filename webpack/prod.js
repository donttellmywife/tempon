const Compress = require('compression-webpack-plugin')
const CSS = require('mini-css-extract-plugin')

const merge = require('webpack-merge')
const common = require('./config.js')
module.exports = merge({
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
    // creates gzip
    new Compress(),
    new CSS(),
  ],
}, common)
