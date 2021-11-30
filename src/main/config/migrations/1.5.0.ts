import Conf from 'conf/dist/source'
import { TypedStore as PrevTypedStore } from './1.4.0'

export type TypedStore = {
  stopTimerOnSuspend: boolean
  stopTimerOnShutdown: boolean
  remindTimerOnUnlocked: boolean
  alwaysOnTop: boolean
  showMiniTimer: boolean
  openAtLogin: boolean
}

export const migration = (
  store: Conf<TypedStore & Partial<PrevTypedStore>>
): void => {
  store.set('openAtLogin', true)
}
