import { app, Menu } from 'electron';
import { showActivityEditor } from './windows';

app.on('ready', () => {
  if (process.platform !== 'darwin') return;
  app.dock.setMenu(
    Menu.buildFromTemplate([
      {
        label: 'New Activity',
        click: () => showActivityEditor()
      }
    ])
  );
});
