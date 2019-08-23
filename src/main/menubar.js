import path from 'path';
import { app } from 'electron';
import { Menubar } from 'menubar';
import { differenceInSeconds } from 'date-fns';
import { fromS } from 'hh-mm-ss';
import { generateUrl } from './windows';
import store from '../renderer/store';

const menubar = new Menubar(app, {
  index: generateUrl(),
  icon: path.join(__static, '/IconTemplate.png'),
  preloadWindow: true,
  browserWindow: {
    width: 285,
    height: 480,
    webPreferences: {
      nodeIntegration: true
    }
  }
});

function getTrayTitle() {
  const startedAt = (store.getters['activities/working'] || {}).startedAt;
  return startedAt ? fromS(differenceInSeconds(new Date(), startedAt)) : '';
}

menubar.on('ready', () => {
  setInterval(() => menubar.tray.setTitle(getTrayTitle()), 500);
});

export default menubar;
