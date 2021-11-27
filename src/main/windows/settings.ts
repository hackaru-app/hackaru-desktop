import { BrowserWindow } from 'electron'
import { getWindowUrl, buildWindowOptions } from '~/modules/window'

let window: BrowserWindow | undefined

export function createSettingsWindow(): BrowserWindow {
  if (window) return window

  const options = buildWindowOptions('settings', { width: 600, height: 480 })
  window = new BrowserWindow(options)
  window.on('closed', () => (window = undefined))
  window.removeMenu()
  window.loadURL(getWindowUrl('/settings/general'))

  return window
}
