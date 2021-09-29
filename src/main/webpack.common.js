const path = require('path')
const glob = require('glob')
const Dotenv = require('dotenv-webpack')

function buildEntries({ dir, filename }) {
  return glob.sync(dir).reduce((entries, entryPath) => {
    const name = path.parse(entryPath).name
    return { ...entries, [name]: { import: entryPath, filename } }
  }, {})
}

module.exports = {
  target: 'electron-main',
  entry: {
    main: './src/main/index',
    ...buildEntries({
      dir: './src/main/preloads/*.ts',
      filename: 'preloads/[name].js',
    }),
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
  plugins: [new Dotenv({ systemvars: true })],
  output: {
    path: path.resolve(__dirname, '../../dist/main'),
  },
}
