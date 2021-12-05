import { BrowserWindow } from 'electron'
import Positioner from 'electron-positioner'
import { getWindowUrl, buildWindowOptions } from '~/modules/window'

let window: BrowserWindow | undefined

export function createMiniTimerWindow(): BrowserWindow {
  if (window) return window

  const options = buildWindowOptions('mini-timer', {
    width: 140,
    height: 75,
    resizable: false,
    transparent: true,
    focusable: false,
    frame: false,
    alwaysOnTop: true,
    hasShadow: false,
  })
  window = new BrowserWindow(options)
  window.on('closed', () => (window = undefined))
  window.removeMenu()
  window.setIgnoreMouseEvents(true, { forward: true })
  window.loadURL(getWindowUrl('/mini-timer'))
  updateMiniTimerWindowPosition()

  return window
}

export function updateMiniTimerWindowPosition() {
  if (!window) return

  new Positioner(window).move('bottomRight')
}
