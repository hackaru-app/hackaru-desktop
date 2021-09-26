import { Notification, NotificationAction } from 'electron'
import i18next from 'i18next'

function getBodyText(prevDescription: string): string {
  return prevDescription
    ? i18next.t('reminderNotification.description', { prevDescription })
    : i18next.t('reminderNotification.descriptionWithoutPrev')
}

function getActions(prevDescription: string): Array<NotificationAction> {
  if (prevDescription) {
    return [{ type: 'button', text: '同じ内容で開始' }]
  } else {
    return []
  }
}

export function createReminderNotification(
  prevDescription: string
): Notification {
  return new Notification({
    title: i18next.t('reminderNotification.title'),
    body: getBodyText(prevDescription),
    actions: getActions(prevDescription),
    silent: true,
  })
}
