const path = require('path')
const { URL, pathToFileURL } = require('url')
const { basePath } = require('~/modules/base-path')

function getBaseUrl() {
  if (process.env.NODE_ENV === 'production') {
    const indexPath = path.resolve(basePath, 'renderer/index.html')
    return pathToFileURL(indexPath)
  } else {
    return new URL('http://localhost:7865')
  }
}

module.exports.isWindowHostname = (input) => {
  return new URL(input).origin === getBaseUrl().origin
}

module.exports.getWindowUrl = (input) => {
  const url = getBaseUrl()
  url.hash = input
  return url
}
