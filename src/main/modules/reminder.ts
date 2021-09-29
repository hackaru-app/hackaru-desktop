import { Notification, NotificationAction } from 'electron'
import i18next from 'i18next'

function getBodyText(prevDescription: string): string {
  return prevDescription
    ? i18next.t('reminder:prevDescription', { prevDescription })
    : i18next.t('reminder:noPrevDescription')
}

function getActions(prevDescription: string): Array<NotificationAction> {
  if (prevDescription) {
    return [
      {
        type: 'button',
        text: i18next.t('reminder:duplicate'),
      },
    ]
  } else {
    return []
  }
}

export function createReminder(prevDescription: string): Notification {
  return new Notification({
    title: i18next.t('reminder:title'),
    body: getBodyText(prevDescription),
    actions: getActions(prevDescription),
    silent: true,
  })
}
