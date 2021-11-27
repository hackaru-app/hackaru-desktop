import { BrowserWindow, nativeTheme } from 'electron'
import { getWindowUrl, buildWindowOptions } from '~/modules/window'

let window: BrowserWindow | undefined

export function createMainWindow(): BrowserWindow {
  if (window) return window

  const options = buildWindowOptions('main', {
    width: 225,
    height: 370,
    maximizable: false,
    titleBarStyle: 'hidden',
    hasShadow: true,
    titleBarOverlay: {
      color: nativeTheme.shouldUseDarkColors ? '#262b38' : '#3f4961',
      symbolColor: '#fff',
    },
  })
  window = new BrowserWindow(options)
  window.on('closed', () => (window = undefined))
  window.removeMenu()
  window.loadURL(getWindowUrl('/'))

  return window
}
