import Conf from 'conf/dist/source'
import { TypedStore as PrevTypedStore } from './1.3.0'

export type TypedStore = {
  stopTimerOnSuspend: boolean
  stopTimerOnShutdown: boolean
  remindTimerOnUnlocked: boolean
}

export const migration = (
  store: Conf<TypedStore & Partial<PrevTypedStore>>
): void => {
  store.set('stopTimerOnSuspend', store.get('powerMonitor.suspend', true))
  store.set('stopTimerOnShutdown', store.get('powerMonitor.shutdown', true))
  store.set(
    'remindTimerOnUnlocked',
    store.get('powerMonitor.remindTimerOnUnlocking', true)
  )
  store.delete('powerMonitor')
}
