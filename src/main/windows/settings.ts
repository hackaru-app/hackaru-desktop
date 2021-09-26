import * as path from 'path'
import { BrowserWindow } from 'electron'
import { basePath } from '~/modules/base-path'
import { getWindowUrl } from '~/modules/window-url'

export function createSettingsWindow(): BrowserWindow {
  const window = new BrowserWindow({
    width: 600,
    height: 480,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      worldSafeExecuteJavaScript: true,
      disableBlinkFeatures: 'Auxclick',
      sandbox: true,
      preload: path.resolve(basePath, 'main/preload.js'),
    },
  })
  window.removeMenu()
  window.loadURL(`${getWindowUrl('/settings/power-monitor')}`)
  return window
}
