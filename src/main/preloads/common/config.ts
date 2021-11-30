import { invoke } from '~/core/preloads'
import { createPrefixer } from '~/core/prefixer'

const namespace = 'config'
const prefix = createPrefixer(namespace)
const missingKeyError = new Error('Requested key is missing')

const accessibleKeys = [
  'stopTimerOnSuspend',
  'stopTimerOnShutdown',
  'remindTimerOnUnlocked',
  'alwaysOnTop',
  'showMiniTimer',
  'enableAutoLaunch',
]

export const config = {
  get(key: string): Promise<unknown> {
    if (!accessibleKeys.includes(key)) throw missingKeyError
    return invoke(prefix('get'), key)
  },
  set(key: string, value: string): void {
    if (!accessibleKeys.includes(key)) throw missingKeyError
    invoke(prefix('set'), key, value)
  },
}
