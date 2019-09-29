import path from 'path';
import { app } from 'electron';
import { Menubar } from 'menubar';
import { differenceInSeconds, parseISO } from 'date-fns';
import { fromS } from 'hh-mm-ss';
import { generateUrl } from './windows';
import store from '../renderer/store';
import { pageView } from '../renderer/ua';

function getTrayIcon() {
  switch (process.platform) {
    case 'darwin':
      return '/IconTemplate.png';
    case 'win32':
      return '/icon-tray.ico';
    default:
      return '/icon-tray-light.png';
  }
}

const menubar = new Menubar(app, {
  index: generateUrl(),
  icon: path.join(__static, getTrayIcon()),
  tooltip: 'Open App',
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
  return startedAt
    ? fromS(differenceInSeconds(new Date(), parseISO(startedAt)))
    : '';
}

async function fetchStatus() {
  if (store.getters['auth/accessToken']) {
    await store.dispatch('activities/fetchWorking');
    await store.dispatch('projects/fetch');
  }
}

menubar.on('ready', () => {
  setInterval(() => menubar.tray.setTitle(getTrayTitle()), 500);
});

menubar.on('after-create-window', async () => {
  await fetchStatus();
});

menubar.on('show', async () => {
  await fetchStatus();
  pageView({ path: '/', name: 'Index' });
});

export default menubar;
