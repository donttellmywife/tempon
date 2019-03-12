const { resolve } = require('path')

// PLUGINS
const { DefinePlugin } = require('webpack')
const HTML = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')


module.exports = {
  context: resolve('src'),
  entry: './index.js',
  output: {
    path: resolve('dist'),
  },


  resolve: {
    alias: {
      '~': resolve('src/'), // in case

      'APP': resolve('src/modules/'),
      'API': resolve('src/api/'),
      'COMPONENT': resolve('src/components/'),
      'PAGE': resolve('src/pages/'),
      'LAYOUT': resolve('src/layouts/'),
      'CONST': resolve('src/const/'),
      'MIXIN': resolve('src/mixin/'),

      'vue$': 'vue/dist/vue.esm.js', // for local develompent
    },
  },


  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader',
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(s?css)$/,
        use: [
          'css-loader',
          'postcss-loader',
        ],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 25000,
          },
        },
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            mimetype: 'application/font-woff',
          },
        }
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader',
      },
    ]
  },


  plugins: [
    new HTML({
      template: 'index.html',
    }),
    new VueLoaderPlugin(),
  ],
};
