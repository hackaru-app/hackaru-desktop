import { app } from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import { notify } from './notifier';

autoUpdater.on('update-downloaded', info => {
  notify({
    title: `v${info.version} New version released!`,
    message: 'Click the notification to restart.'
  }).on('click', () => autoUpdater.quitAndInstall());
});

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') {
    autoUpdater.logger = log;
    autoUpdater.checkForUpdates();
  }
});
