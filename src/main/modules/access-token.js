const keytar = require('keytar')

const service = `hackaru-desktop-${process.env.NODE_ENV}`
const account = process.env.HACKARU_API_CLIENT_ID

module.exports.storeAccessToken = (accessToken) => {
  return keytar.setPassword(service, account, accessToken)
}

module.exports.restoreAccessToken = () => {
  return keytar.getPassword(service, account)
}

module.exports.removeAccessToken = () => {
  return keytar.deletePassword(service, account)
}
