import { BrowserWindow } from 'electron'
import { SingleWindow } from '~/modules/single-window'
import { getWindowUrl, buildWindowOptions } from '~/modules/window'

const options = buildWindowOptions('settings', { width: 600, height: 480 })
const singleWindow = new SingleWindow(options)

export function createSettingsWindow(): BrowserWindow {
  return singleWindow.ensure((window) => {
    window.removeMenu()
    window.loadURL(getWindowUrl('/settings/power-monitor'))
  })
}
