import { ipcMain } from 'electron'

type Handler = (event: Electron.IpcMainInvokeEvent, ...args: any[]) => unknown

export function handle(key: string, handler: Handler): void {
  ipcMain.handle(key, handler)
}
