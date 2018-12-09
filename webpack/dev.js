const {HotModuleReplacementPlugin} = require('webpack')

const {smart} = require('webpack-merge')
// respect previous loaders loaders, and concatinate to them
const common = require('./config.js')
module.exports = smart({
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
