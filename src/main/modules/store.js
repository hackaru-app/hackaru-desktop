const Store = require('electron-store')

const schema = {
  powerMonitor: {
    type: 'object',
    properties: {
      suspend: {
        type: 'boolean',
      },
      shutdown: {
        type: 'boolean',
      },
    },
  },
}

const defaults = {
  powerMonitor: {
    suspend: true,
    shutdown: true,
  },
}

module.exports.createStore = () =>
  new Store({
    schema,
    defaults,
    name: process.env.NODE_ENV,
    serialize: (value) => JSON.stringify(value, null, '  '),
  })
