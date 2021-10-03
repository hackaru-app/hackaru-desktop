import { fromS } from 'hh-mm-ss'
import { differenceInSeconds } from 'date-fns'
import { Tray } from 'electron'

export class TrayTimer {
  private timer?: NodeJS.Timeout

  public start(tray: Tray, startedAt: Date): void {
    this.stop(tray)
    this.timer = setInterval(() => {
      const duration = this.getDuration(startedAt)
      tray.setTitle(duration, { fontType: 'monospacedDigit' })
    }, 500)
  }

  public stop(tray: Tray): void {
    tray.setTitle('')
    if (this.timer) {
      clearInterval(this.timer)
    }
  }

  private getDuration(startedAt: Date): string {
    return fromS(differenceInSeconds(new Date(), startedAt))
  }
}
