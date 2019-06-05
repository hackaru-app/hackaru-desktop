import { ipcMain, ipcRenderer } from 'electron';

const SEND_STATE = 'shared-state-send-state';

export default (options = {}) => store => {
  function renderer() {
    const state = ipcRenderer.sendSync(SEND_STATE);
    store.replaceState(state);
  }

  function main() {
    ipcMain.on(SEND_STATE, event => {
      event.returnValue = store.state;
    });
  }

  return process.type === 'renderer' ? renderer() : main();
};
