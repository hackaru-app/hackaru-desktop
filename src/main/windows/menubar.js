const path = require('path')
const { menubar } = require('menubar')
const { getTrayIcon } = require('~/modules/tray-icon')
const { basePath } = require('~/modules/base-path')
const { getWindowUrl } = require('~/modules/window-url')

module.exports.createMenubar = () => {
  return menubar({
    index: `${getWindowUrl('/')}`,
    icon: getTrayIcon(),
    preloadWindow: true,
    tooltip: 'Open the app',
    browserWindow: {
      width: 285,
      height: 480,
      webPreferences: {
        nodeIntegration: false,
        contextIsolation: true,
        worldSafeExecuteJavaScript: true,
        disableBlinkFeatures: 'Auxclick',
        sandbox: true,
        preload: path.resolve(basePath, 'main/preload.js'),
      },
    },
  })
}
