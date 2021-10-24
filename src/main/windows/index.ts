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
      titleBarOverlay: {
        color: '#2c3241',
        symbolColor: '#74b1be',
      },
    })
  )
  window.removeMenu()
  window.loadURL(getWindowUrl('/'))
  return window
}
