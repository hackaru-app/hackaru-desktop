import * as path from 'path'
import { srcDir } from '~/modules/src-dir'

function getTrayIconFileName() {
  switch (process.platform) {
    case 'darwin':
      return 'trayIconTemplate.png'
    case 'win32':
      return 'tray-icon.ico'
    default:
      return 'tray-icon.png'
  }
}

export function getTrayIcon(): string {
  return path.resolve(srcDir, `../static/${getTrayIconFileName()}`)
}
