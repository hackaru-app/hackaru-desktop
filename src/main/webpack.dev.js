const { merge } = require('webpack-merge')
const Dotenv = require('dotenv-webpack')
const common = require('./webpack.common.js')

process.env.NODE_ENV = 'development'

module.exports = common.map((config) =>
  merge(config, {
    mode: 'development',
    plugins: [
      new Dotenv({
        path: '.env.development',
      }),
    ],
  })
)
