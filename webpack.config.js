const path = require('path');
const webpack = require("webpack");

module.exports = {
  entry: [
    './src/modernizr.js',
    './src/index.js',
  ],
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'public/js'),
  },
  resolve: {
    alias: {
        jquery: "jquery/src/jquery"
    }
  },
  plugins: [
    new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery"
    })
  ]
};