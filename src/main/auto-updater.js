import { app } from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') {
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
});
