import { BrowserWindow } from 'electron'
import { getWindowUrl, buildWindowOptions } from '~/modules/window'

let window: BrowserWindow | undefined

export function createMainWindow(): BrowserWindow {
  if (window) return window

  const options = buildWindowOptions('main', {
    width: 225,
    height: 370,
    transparent: true,
    frame: true,
    maximizable: false,
    titleBarStyle: 'hidden',
  })
  window = new BrowserWindow(options)
  window.on('closed', () => (window = undefined))
  window.removeMenu()
  window.loadURL(getWindowUrl('/'))

  return window
}
