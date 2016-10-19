var webpack = require('webpack');
var path = require('path');

var ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin;

module.exports = {
  entry: {
    app: './src/app/main.dev.ts'
  },

  output: {
    path: path.join(process.cwd(), 'www/build'),
    filename: 'main.js'
  },

  resolve: {
    extensions: ['.ts', '.js']
  },

  module: {
    loaders: [
      {
        test: /\.ts$/,
        loaders: ['awesome-typescript-loader'],
      }
    ]
  },

  plugins: [
    new ForkCheckerPlugin(),
  ]
};