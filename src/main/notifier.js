import notifier from 'node-notifier';
import path from 'path';

export function resolveIconPath() {
  const dirPath =
    process.env.NODE_ENV !== 'development' ? process.resourcesPath : '';
  return path.join(dirPath, './extra-resources/icon-notification.png');
}

export function notify({ title, message }) {
  notifier.notify({ icon: resolveIconPath(), title, message });
  return notifier;
}
