'use strict';
// webpack --profile --display-modules --display-reasons

var webpack = require('webpack');

module.exports = {
  context: __dirname + '/src',

  entry: {
    app: './app.module',
    vendors: './vendors.module'
  },

  output: {
    path: __dirname + '/dist', // __dirname - recommended
    filename: '[name].js',
    library: '[name]'
  },

  // override default config to faster searching
  // config where webpack should find modules (root - root path for modules)
  resolve: {
    modulesDirectories: ['node_modules'],
    extensions: ['', '.js']
  },

  // override default config to faster searching
  // config where webpack should find loaders
  resolveLoader: {
    modulesDirectories: ['node_modules'],
    moduleTemplates: ['*-loader', '*'],
    extensions: ['', '.js']
  },

  // https://youtu.be/EeLg1mTaz3U
  // don`t parse big libraries without module.exports, require etc.
  // noParse: /angular\/angular.js/,

  // https://youtu.be/RdZkFNzST3c
  // associates global variables(e.g. lodash loaded from CDN) with require statement | require('lodash') loads lodash from externals (CDN), not from node_modules
  externals: {
    lodash: '_'   // loaded from CDN
  },

  plugins: [
    // skips build if errors
    new webpack.NoErrorsPlugin(),

    // publishes variables to required modules
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(process.env.NODE_ENV)
    }),

    // https://youtu.be/9VSVg38Afms
    // associates free variables in modules with node_modules export | require statements is not needed | applicable for frequently used libraries
    new webpack.ProvidePlugin({
      angular: 'exports?window.angular!angular',
      $: 'jquery'
    })
  ],

  module: {
    loaders: [
      // import and export of arbitrary variable to required file
      {
        test: /old\/old.js/,
        loaders: [
          // import loader - imports variable 'globalMessage'
          'imports?globalMessage=>"it is a global message"',
          // export loader - exports function 'logGlobalMessage'
          'exports?logGlobalMessage'
        ]
      }
    ]
  },

  // dev config
  // creates source map
  devtool: process.env.NODE_ENV === 'dev' ? 'cheap-inline-module-source-map' : null,

  devServer: {
    contentBase: './dist'
  }
};