import path from 'path';
import { ipcMain, BrowserWindow } from 'electron';
import queryString from 'query-string';

export function generateUrl(path, query) {
  return process.env.NODE_ENV === 'development'
    ? `http://localhost:9080/#/${path}?${query}`
    : `file://${__dirname}/index.html#${path}?${query}`;
}

function getNextInitialWindowPosition() {
  const focused = BrowserWindow.getFocusedWindow();
  const offset = 40;
  return focused
    ? {
        x: focused.getPosition()[0] + offset,
        y: focused.getPosition()[1] + offset
      }
    : {};
}

function createWindow(data) {
  const win = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true
    },
    width: data.width,
    height: data.height,
    fullscreenable: false,
    titleBarStyle: 'hidden',
    resizable: true,
    icon: path.join(__dirname, '/icons/512x512.png'),
    ...getNextInitialWindowPosition()
  });

  const query = queryString.stringify(data.query);
  win.loadURL(generateUrl(data.path, query));
  win.setMenu(null);

  return win;
}

export function showTrackerEditor(query) {
  createWindow({
    path: 'settings/tracker-editor',
    width: 460,
    height: 380
  });
}

export function showSettings() {
  createWindow({
    path: 'settings/trackers',
    width: 600,
    height: 480
  });
}

ipcMain.on('showTrackerEditor', (e, data) => showTrackerEditor(data));
ipcMain.on('showSettings', () => showSettings());
