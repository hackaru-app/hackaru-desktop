import { fromS } from 'hh-mm-ss'
import { parseISO, differenceInSeconds } from 'date-fns'
import { Tray } from 'electron'

function getDuration(startedAt: string): number {
  return differenceInSeconds(new Date(), parseISO(startedAt))
}

export function startTrayTimer(tray: Tray, startedAt: string): NodeJS.Timeout {
  return setInterval(() => {
    const title = fromS(getDuration(startedAt))
    tray.setTitle(title, { fontType: 'monospacedDigit' })
  }, 500)
}
