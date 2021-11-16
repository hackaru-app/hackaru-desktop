import { Menubar, menubar } from 'menubar'
import { getTrayIcon } from '~/modules/tray-icon'
import { getWindowUrl, buildWindowOptions } from '~/modules/window'

export function createMenubar(): Menubar {
  return menubar({
    index: getWindowUrl('/'),
    icon: getTrayIcon(),
    preloadWindow: true,
    browserWindow: buildWindowOptions('menubar', {
      width: 255,
      height: 400,
      transparent: true,
      frame: false,
      titleBarStyle: 'hidden',
    }),
  })
}
