import * as path from 'path'
import { Menubar, menubar } from 'menubar'
import { getTrayIcon } from '~/modules/tray-icon'
import { basePath } from '~/modules/base-path'
import { getWindowUrl } from '~/modules/window-url'

export function createMenubar(): Menubar {
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
