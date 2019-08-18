import path from 'path';
import { app, ipcMain, BrowserWindow } from 'electron';
import queryString from 'query-string';

let mainWindow = null;

function createWindow(data) {
  const getPosition = () => {
    const focused = BrowserWindow.getFocusedWindow();
    const offset = 40;
    return focused
      ? {
          x: focused.getPosition()[0] + offset,
          y: focused.getPosition()[1] + offset
        }
      : {};
  };

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
    ...getPosition()
  });

  // Disable window menu.
  win.setMenu(null);

  const query = queryString.stringify(data.query);
  const url =
    process.env.NODE_ENV === 'development'
      ? `http://localhost:9080/#/${data.path}?${query}`
      : `file://${__dirname}/index.html#${data.path}?${query}`;

  win.loadURL(url);

  return win;
}

export function showMain() {
  if (mainWindow === null) {
    mainWindow = createWindow({
      width: 290,
      height: 480
    });
    mainWindow.on('closed', () => {
      mainWindow = null;
    });
  }
  mainWindow.show();
}

export function showActivityEditor(query) {
  createWindow({
    path: 'activity-editor',
    width: 370,
    height: 420,
    query
  });
}

export function showTrackerEditor(query) {
  createWindow({
    path: 'settings/tracker-editor',
    width: 360,
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

ipcMain.on('showActivityEditor', (e, data) => showActivityEditor(data));

ipcMain.on('showTrackerEditor', (e, data) => showTrackerEditor(data));

ipcMain.on('showSettings', () => showSettings());

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  showMain();
});

app.on('ready', () => {
  showMain();
});
