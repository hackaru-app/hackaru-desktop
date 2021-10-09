import Conf from 'conf/dist/source'
import { Migrations } from 'conf/dist/source/types'
import * as Store from 'electron-store'

interface TypedStore {
  stopTimerOnSuspend: boolean
  stopTimerOnShutdown: boolean
  remindTimerOnUnlocked: boolean
}

const schema: Store.Schema<TypedStore> = {
  stopTimerOnSuspend: {
    type: 'boolean',
  },
  stopTimerOnShutdown: {
    type: 'boolean',
  },
  remindTimerOnUnlocked: {
    type: 'boolean',
  },
}

const defaults: TypedStore = {
  stopTimerOnSuspend: true,
  stopTimerOnShutdown: true,
  remindTimerOnUnlocked: true,
}

const migrations: Migrations<TypedStore> = {
  '1.3.0': (store: Conf<TypedStore>) => {
    store.set('powerMonitor.remindTimerOnUnlocking', true)
  },
  '1.3.1': (store: Conf<TypedStore>) => {
    store.set('stopTimerOnSuspend', store.get('powerMonitor.suspend', true))
    store.set('stopTimerOnShutdown', store.get('powerMonitor.shutdown', true))
    store.set(
      'remindTimerOnUnlocked',
      store.get('powerMonitor.remindTimerOnUnlocking', true)
    )
    // store.delete('powerMonitor')
  },
}

export const store = new Store<TypedStore>({
  schema,
  defaults,
  name: process.env.NODE_ENV,
  serialize: (value) => JSON.stringify(value, null, '  '),
  migrations,
})
