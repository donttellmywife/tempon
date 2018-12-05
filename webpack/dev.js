const {HotModuleReplacementPlugin} = require('webpack')

const merge = require('webpack-merge')
const common = require('./config.js')
module.exports = merge({
  mode: 'development',

  devServer: {
    hot: true,
    port: 1234,
    inline: true,
    stats: { colors: true },
  },

  optimization: {
    usedExports: true,
  },

  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: [
          'style-loader',
        ]
      },
    ],
  },

  plugins: [
    new HotModuleReplacementPlugin(),
  ],
}, common)
