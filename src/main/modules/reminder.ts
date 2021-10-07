import { Notification, NotificationAction } from 'electron'
import i18next from 'i18next'

function buildBodyText(prevDescription: string): string {
  return prevDescription
    ? i18next.t('reminder:prevDescription', { prevDescription })
    : i18next.t('reminder:noPrevDescription')
}

function buildActions(prevDescription: string): Array<NotificationAction> {
  if (!prevDescription) return []

  return [{ type: 'button', text: i18next.t('reminder:duplicate') }]
}

export function createReminder(prevDescription: string): Notification {
  return new Notification({
    title: i18next.t('reminder:title'),
    body: buildBodyText(prevDescription),
    actions: buildActions(prevDescription),
    silent: true,
  })
}
