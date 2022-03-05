const { merge } = require('webpack-merge')
const Dotenv = require('dotenv-webpack')
const common = require('./webpack.common.js')

process.env.NODE_ENV = 'production'

module.exports = common.map((config) =>
  merge(config, {
    mode: 'production',
    devtool: 'hidden-source-map',
    plugins: [
      new Dotenv({
        path: '.env.production',
        systemvars: true,
      }),
    ],
  })
)
