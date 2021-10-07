import { fromS } from 'hh-mm-ss'
import { differenceInSeconds } from 'date-fns'
import { Tray } from 'electron'

export function start(tray: Tray, startedAt: Date): NodeJS.Timeout {
  return setInterval(() => {
    const duration = fromS(differenceInSeconds(new Date(), startedAt))
    tray.setTitle(duration, { fontType: 'monospacedDigit' })
  }, 500)
}

export function stop(tray: Tray, timeout: NodeJS.Timeout): void {
  tray.setTitle('')
  clearInterval(timeout)
}
