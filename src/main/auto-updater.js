import { app } from 'electron';
import { autoUpdater } from 'electron-updater';

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') {
    autoUpdater.checkForUpdatesAndNotify();
  }
});
