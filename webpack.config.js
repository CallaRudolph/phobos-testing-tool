const webpack = require('webpack');
var path = require('path');


const BUILD_DIR = path.resolve(__dirname, './build');
const APP_DIR = path.resolve(__dirname, './src');

module.exports = {
  entry: {
    main: APP_DIR + '/client/index.jsx'
  },
  output: {
    filename: 'bundle.js',
    path: BUILD_DIR,
  },
  module: {
    rules: [
      {
        test: /(\.css|.scss)$/,
        use: [{
          loader: "style-loader" // creates style nodes from JS strings
        }, {
          loader: "css-loader" // translates CSS into CommonJS
        }, {
          loader: "sass-loader" // compiles Sass to CSS
        }]
      },
      {
        test: /\.(jsx|js)?$/,
        exclude: /node_modules/, // watches routes file without error messages from node_modules
        use: [{
          loader: "babel-loader",
          options: {
            cacheDirectory: true,
            presets: ['react', 'es2015'] // Transpiles JSX and ES6
          }
        }]
      }
    ],
  },
  node: {
    fs: 'empty',
    tls: 'empty',
    lib: 'empty',
    net: 'empty'
  }
}
