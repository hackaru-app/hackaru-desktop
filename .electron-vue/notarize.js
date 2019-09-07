const path = require('path')
const { notarize } = require('electron-notarize')

const appleId = process.env.APPLE_ID
const appleIdPassword = process.env.APPLE_PASSWORD

const configPath = path.resolve(__dirname, '../package.json')
const appPath = path.resolve(__dirname, '../build/mac/Hackaru.app')
const config = require(configPath)
const appBundleId = config.build.appId

exports.default = async () => {
  console.log(process.env.NOTARIZE);
  if (!appleId || !appleIdPassword || !process.env.NOTARIZE) {
    console.warn('notarize skipped');
    return;
  }
  await notarize({
    appBundleId,
    appPath,
    appleId,
    appleIdPassword,
  })
}
