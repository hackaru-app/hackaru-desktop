import * as path from 'path'
import { basePath } from '~/modules/base-path'

function getTrayIconFileName() {
  switch (process.platform) {
    case 'darwin':
      return 'IconTemplate.png'
    case 'win32':
      return 'icon-tray.ico'
    default:
      return 'icon-tray-light.png'
  }
}

export function getTrayIcon(): string {
  return path.resolve(basePath, `../static/${getTrayIconFileName()}`)
}
