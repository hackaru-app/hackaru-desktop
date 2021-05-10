const installExtension = require('electron-devtools-installer').default
const { VUEJS_DEVTOOLS } = require('electron-devtools-installer')

module.exports.initDevtools = async () => {
  await installExtension(VUEJS_DEVTOOLS)
}
