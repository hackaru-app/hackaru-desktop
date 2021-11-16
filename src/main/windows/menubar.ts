import { Menubar, menubar } from 'menubar'
import { getTrayIcon } from '~/modules/tray-icon'
import { getWindowUrl, buildWindowOptions } from '~/modules/window'

export function createMenubar(): Menubar {
  return menubar({
    index: getWindowUrl('/'),
    icon: getTrayIcon(),
    preloadWindow: true,
    browserWindow: buildWindowOptions('menubar', {
      width: 230,
      height: 350,
      transparent: true,
      frame: true,
      titleBarStyle: 'hidden',
    }),
  })
}
