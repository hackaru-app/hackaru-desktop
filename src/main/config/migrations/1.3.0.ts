import Conf from 'conf/dist/source'

export type TypedStore = {
  powerMonitor: {
    suspend: boolean
    shutdown: boolean
    remindTimerOnUnlocking: boolean
  }
}

export const migration = (store: Conf<TypedStore>): void => {
  store.set('powerMonitor.remindTimerOnUnlocking', true)
}
