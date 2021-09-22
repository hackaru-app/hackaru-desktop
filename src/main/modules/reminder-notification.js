const { Notification } = require('electron')
const { i18next } = require('~/modules/i18next')

function getBodyText(prevDescription) {
  return prevDescription
    ? i18next.t('reminderNotification.description', { prevDescription })
    : i18next.t('reminderNotification.descriptionWithoutPrev')
}

function getActions(prevDescription) {
  if (prevDescription) {
    return [{ type: 'button', text: '同じ内容で開始' }]
  } else {
    return []
  }
}

module.exports.createReminderNotification = function (prevDescription) {
  return new Notification({
    title: i18next.t('reminderNotification.title'),
    body: getBodyText(prevDescription),
    actions: getActions(prevDescription),
    silent: true,
  })
}
