import { BrowserWindow } from 'electron'
import { getWindowUrl, buildWindowOptions } from '~/modules/window'

export function createIndexWindow(): BrowserWindow {
  const window = new BrowserWindow(
    buildWindowOptions('index', {
      width: 265,
      height: 410,
      minWidth: 265,
      minHeight: 155,
      alwaysOnTop: true,
      frame: true,
      titleBarStyle: 'hidden',
    })
  )
  window.removeMenu()
  window.loadURL(getWindowUrl('/'))
  return window
}
