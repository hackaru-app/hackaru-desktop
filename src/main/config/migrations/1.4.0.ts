import Conf from 'conf/dist/source'
import { TypedStore as PrevTypedStore } from './1.3.1'

export type TypedStore = {
  stopTimerOnSuspend: boolean
  stopTimerOnShutdown: boolean
  remindTimerOnUnlocked: boolean
  alwaysOnTop: boolean
  showMiniTimer: boolean
}

export const migration = (
  store: Conf<TypedStore & Partial<PrevTypedStore>>
): void => {
  store.set('alwaysOnTop', false)
  store.set('showMiniTimer', true)
}
