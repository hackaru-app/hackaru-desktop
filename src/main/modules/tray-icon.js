const path = require('path')
const { basePath } = require('~/modules/base-path')

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

module.exports.getTrayIcon = () => {
  return path.resolve(basePath, `../static/${getTrayIconFileName()}`)
}
