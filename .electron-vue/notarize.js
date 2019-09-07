const path = require('path')
const { notarize } = require('electron-notarize')

const appleId = process.env.APPLE_ID
const appleIdPassword = process.env.APPLE_PASSWORD

const configPath = path.resolve(__dirname, '../package.json')
const appPath = path.resolve(__dirname, '../build/mac/Hackaru.app')
const config = require(configPath)
const appBundleId = config.build.appId

exports.default = async () => {
  if (!appleId || !appleIdPassword) {
    console.warn('notarize skipped because APPLE_ID or APPLE_PASSWORD is not exists.');
    return;
  }
  await notarize({
    appBundleId,
    appPath,
    appleId,
    appleIdPassword,
  })
}
