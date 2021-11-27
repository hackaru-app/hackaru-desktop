import { fromS } from 'hh-mm-ss'
import { differenceInSeconds } from 'date-fns'
import { Tray } from 'electron'

let timer: NodeJS.Timeout | undefined

export function start(tray: Tray, startedAt: Date): void {
  if (timer) clearInterval(timer)

  timer = setInterval(() => {
    const duration = fromS(differenceInSeconds(new Date(), startedAt))
    tray.setTitle(duration, { fontType: 'monospacedDigit' })
  }, 500)
}

export function stop(tray: Tray): void {
  if (timer) clearInterval(timer)
  tray.setTitle('')
}
