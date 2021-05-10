const path = require('path')
const { BrowserWindow } = require('electron')
const { basePath } = require('~/modules/base-path')
const { getWindowUrl } = require('~/modules/window-url')

module.exports.createSettingsWindow = () => {
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
