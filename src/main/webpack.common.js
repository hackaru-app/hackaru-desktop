const { merge } = require('webpack-merge')
const path = require('path')
const glob = require('glob')

function buildPreloadEntries() {
  return glob.sync('./src/main/preloads/*.ts').reduce((entries, entryPath) => {
    return { ...entries, [path.parse(entryPath).name]: entryPath }
  }, {})
}

const common = {
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
      },
    ],
  },
  resolve: {
    alias: {
      '~': path.resolve(__dirname),
    },
    extensions: ['.ts', '.js'],
  },
  node: {
    __dirname: false,
  },
}

const main = merge(common, {
  target: 'electron-main',
  entry: {
    main: './src/main/index',
  },
  module: {
    rules: [
      {
        test: /\.node$/,
        loader: 'node-loader',
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, '../../dist/main'),
  },
})

const preload = merge(common, {
  target: 'electron-preload',
  entry: buildPreloadEntries(),
  output: {
    path: path.resolve(__dirname, '../../dist/main/preloads'),
  },
})

module.exports = [main, preload]
