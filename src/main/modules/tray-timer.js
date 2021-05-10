const { fromS } = require('hh-mm-ss')
const { parseISO, differenceInSeconds } = require('date-fns')

function getDuration(startedAt) {
  return differenceInSeconds(new Date(), parseISO(startedAt))
}

module.exports.startTrayTimer = (tray, startedAt) => {
  return setInterval(() => {
    const title = fromS(getDuration(startedAt))
    tray.setTitle(title, { fontType: 'monospacedDigit' })
  }, 500)
}
