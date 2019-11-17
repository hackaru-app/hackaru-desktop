const path = require('path')
const { notarize } = require('electron-notarize')

const appleId = process.env.APPLE_ID
const appleIdPassword = process.env.APPLE_PASSWORD
const master = process.env.TRAVIS_BRANCH === 'master'

const configPath = path.resolve(__dirname, '../package.json')
const appPath = path.resolve(__dirname, '../build/mac/Hackaru.app')
const config = require(configPath)
const appBundleId = config.build.appId

exports.default = async () => {
  console.warn(`debug: ${process.env.TRAVIS_BRANCH}`);
  if (!appleId || !appleIdPassword || !master) {
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
