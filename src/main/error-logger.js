import { app } from 'electron';
import log from 'electron-log';

/**
 * Catch error log
 */
process.on('uncaughtException', function(err) {
  log.error('electron:event:uncaughtException');
  log.error(err);
  log.error(err.stack);
  app.quit();
});
