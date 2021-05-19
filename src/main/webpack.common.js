const path = require('path')
const Dotenv = require('dotenv-webpack')

module.exports = {
  target: 'electron-main',
  entry: {
    main: './src/main/index',
    preload: './src/main/preload',
  },
  module: {
    rules: [
      {
        test: /\.node$/,
        loader: 'node-loader',
      },
    ],
  },
  resolve: {
    alias: {
      '~': path.resolve(__dirname),
    },
  },
  node: {
    __dirname: false,
  },
  plugins: [new Dotenv({ systemvars: true })],
  output: {
    path: path.resolve(__dirname, '../../dist/main'),
  },
}
