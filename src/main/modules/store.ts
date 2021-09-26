import Conf from 'conf/dist/source'
import { Migrations } from 'conf/dist/source/types'
import * as Store from 'electron-store'

interface TypedStore {
	powerMonitor: {
    suspend: boolean,
    shutdown: boolean,
    remindTimerOnUnlocking: boolean
  };
};

const schema: Store.Schema<TypedStore> = {
  powerMonitor: {
    type: 'object',
    properties: {
      suspend: {
        type: 'boolean',
      },
      shutdown: {
        type: 'boolean',
      },
      remindTimerOnUnlocking: {
        type: 'boolean',
      },
    },
  },
}

const defaults: TypedStore = {
  powerMonitor: {
    suspend: true,
    shutdown: true,
    remindTimerOnUnlocking: true,
  },
}

const migrations: Migrations<TypedStore> = {
  '1.3.0': (store: Conf<TypedStore>) => {
    store.set('powerMonitor.remindTimerOnUnlocking', true)
  },
}

export function createStore(): Store<TypedStore> {
  return new Store<TypedStore>({
    schema,
    defaults,
    name: process.env.NODE_ENV,
    serialize: (value) => JSON.stringify(value, null, '  '),
    migrations,
  })
}
