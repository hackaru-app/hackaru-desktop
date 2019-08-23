import path from 'path';
import { ipcMain, Menu, app, BrowserWindow } from 'electron';
import queryString from 'query-string';

export function generateUrl(path, query) {
  return process.env.NODE_ENV === 'development'
    ? `http://localhost:9080/#/${path}?${query}`
    : `file://${__dirname}/index.html#${path}?${query}`;
}

function getOffsetedWindowPosition() {
  const focused = BrowserWindow.getFocusedWindow();
  const offset = 40;
  return focused
    ? {
        x: focused.getPosition()[0] + offset,
        y: focused.getPosition()[1] + offset
      }
    : {};
}

function createWindow(data, options) {
  const win = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true
    },
    fullscreenable: false,
    titleBarStyle: 'hidden',
    resizable: true,
    icon: path.join(__dirname, '/icons/512x512.png'),
    ...options
  });

  const query = queryString.stringify(data.query);
  win.loadURL(generateUrl(data.path, query));

  return win;
}

export function showTrackerEditor() {
  createWindow(
    { path: 'settings/tracker-editor' },
    { width: 460, height: 380, ...getOffsetedWindowPosition() }
  );
}

export function showSettings() {
  createWindow({ path: 'settings/trackers' }, { width: 600, height: 480 });
}

app.on('ready', () => {
  Menu.setApplicationMenu(null);
});

ipcMain.on('showTrackerEditor', (e, data) => showTrackerEditor(data));
ipcMain.on('showSettings', () => showSettings());
