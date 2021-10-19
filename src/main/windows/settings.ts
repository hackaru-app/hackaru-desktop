import { BrowserWindow } from 'electron'
import { getWindowUrl, buildWindowOptions } from '~/modules/window'

export function createSettingsWindow(): BrowserWindow {
  const window = new BrowserWindow(
    buildWindowOptions('settings', { width: 600, height: 480 })
  )
  window.removeMenu()
  window.loadURL(getWindowUrl('/settings/power-monitor'))
  return window
}
