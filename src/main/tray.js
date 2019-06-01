'use strict';

import path from 'path';
import { app, Menu, Tray } from 'electron';
import { differenceInSeconds } from 'date-fns';
import { fromS } from 'hh-mm-ss';
import { showMain, showActivityEditor } from './windows';
import store from '../store';

let tray;
const menu = Menu.buildFromTemplate([
  { label: 'Show App', click: () => showMain() },
  { label: 'New Activity', click: () => showActivityEditor() },
  { type: 'separator' },
  { label: 'Quit', click: () => app.quit() }
]);

function getTitle() {
  const activity = store.getters['activities/getWorkingActivities'];
  return activity.length > 0
    ? fromS(differenceInSeconds(new Date(), activity[0].startedAt))
    : '';
}

function getDefaultTrayIcon() {
  switch (process.platform) {
    case 'darwin':
      return '/icon-tray-dark.png';
    case 'win32':
      return '/icon-tray.ico';
    default:
      return '/icon-tray-light.png';
  }
}

app.on('ready', () => {
  const icon = {
    pressed: '/icon-tray-light.png',
    default: getDefaultTrayIcon()
  };

  tray = new Tray(path.join(__static, icon.default));
  tray.setPressedImage(path.join(__static, icon.pressed));
  tray.setContextMenu(menu);

  menu.on('menu-will-show', () => {
    tray.setImage(path.join(__static, icon.pressed));
  });

  menu.on('menu-will-close', () => {
    tray.setImage(path.join(__static, icon.default));
  });

  setInterval(() => tray.setTitle(getTitle()), 500);
});
