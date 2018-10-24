const proxy = require('http-proxy-middleware')
const convert = require('koa-connect')

module.exports = {
  entry: {
    app: [
      'babel-polyfill', 
      'whatwg-fetch', 
      './src/app/app' 
    ],
    testEntry: './src/modules/testEntry.js',
  },
  output: {
    pathinfo: true,
    publicPath: '/',
    filename: 'js/[name].js',
    chunkFilename: 'js/[name].js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
    ]
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          name: 'commons',
          filename: "js/[name].js",
          test: /\.js(x)?$/,
          chunks: "initial",
          minChunks: 2
        }
      }
    },
    runtimeChunk: {
      name: 'shared',
    },
  },
  mode: 'development', 
  devtool: 'eval', 
  devServer: {
    port: 5000,
    noInfo: true,
    proxy: {
      '*': 'http://localhost:3000'
    },
    stats: {
      colors: true
    },
  }
};