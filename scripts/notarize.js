const path = require('path')
const { notarize } = require('electron-notarize')

const appleId = process.env.APPLE_ID
const appleIdPassword = process.env.APPLE_ID_PASSWORD

const configPath = path.resolve(__dirname, '../package.json')
const appPath = path.resolve(__dirname, '../build/mac/Hackaru.app')
const config = require(configPath)
const appBundleId = config.build.appId

function isSkipped() {
  return (
    !appleId || !appleIdPassword || process.env.TRAVIS_PULL_REQUEST !== 'false'
  )
}

exports.default = async () => {
  if (isSkipped()) {
    console.warn('skipped notarization')
    return
  }
  await notarize({
    appBundleId,
    appPath,
    appleId,
    appleIdPassword,
  })
}
