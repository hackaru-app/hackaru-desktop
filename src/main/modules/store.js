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
      remindTimerOnResume: {
        type: 'boolean',
      },
    },
  },
}

const defaults = {
  powerMonitor: {
    suspend: true,
    shutdown: true,
    remindTimerOnResume: true,
  },
}

const migrations = {
  '1.3.0': (store) => {
    store.set('powerMonitor.remindTimerOnResume', true)
  },
}

module.exports.createStore = () =>
  new Store({
    schema,
    defaults,
    projectVersion: process.env.npm_package_version,
    name: process.env.NODE_ENV,
    serialize: (value) => JSON.stringify(value, null, '  '),
    migrations,
  })
