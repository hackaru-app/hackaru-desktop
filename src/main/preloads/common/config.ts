import { invoke } from '~/core/preloads'
import { createPrefixer } from '~/core/prefixer'

const namespace = 'config'
const prefix = createPrefixer(namespace)
const missingKeyError = new Error('Requested key is missing')

const readables = [
  'stopTimerOnSuspend',
  'stopTimerOnShutdown',
  'remindTimerOnUnlocked',
  'alwaysOnTop',
]

const settables = [
  'stopTimerOnSuspend',
  'stopTimerOnShutdown',
  'remindTimerOnUnlocked',
  'alwaysOnTop',
]

export const config = {
  get(key: string): Promise<unknown> {
    if (!readables.includes(key)) throw missingKeyError
    return invoke(prefix('get'), key)
  },
  set(key: string, value: string): void {
    if (!settables.includes(key)) throw missingKeyError
    invoke(prefix('set'), key, value)
  },
}
