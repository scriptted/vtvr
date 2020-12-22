const path = require('path');
const webpack = require("webpack");
const CopyPlugin = require("copy-webpack-plugin");


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
        jquery: "jquery/src/jquery",
    }
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        loader: "less-loader", // compiles Less to CSS
      },
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery"
    }),
    new CopyPlugin({
      patterns: [
        { from: path.resolve(__dirname, "node_modules/font-awesome-animation/dist/font-awesome-animation.min.css"), to: path.resolve(__dirname, "public/css/font-awesome-animation.min.css") },
      ],
    }),
  ]
};