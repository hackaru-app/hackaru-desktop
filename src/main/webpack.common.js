const path = require('path')
const glob = require('glob')

function buildPreloadEntries() {
  return glob.sync('./src/main/preloads/*.ts').reduce((entries, entryPath) => {
    const name = `preloads/${path.parse(entryPath).name}`
    return { ...entries, [name]: { import: entryPath } }
  }, {})
}

module.exports = {
  target: 'electron-main',
  entry: {
    main: './src/main/index',
    ...buildPreloadEntries(),
  },
  module: {
    rules: [
      {
        test: /\.node$/,
        loader: 'node-loader',
      },
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
  output: {
    path: path.resolve(__dirname, '../../dist/main'),
  },
}
