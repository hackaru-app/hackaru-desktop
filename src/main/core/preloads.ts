import { contextBridge, ipcRenderer } from 'electron'

type Listener = (event: Electron.IpcRendererEvent, ...args: any[]) => void

export function invoke<T>(key: string, ...args: any[]): Promise<T> {
  return ipcRenderer.invoke(key, ...args)
}

export function listen(key: string): (listener: Listener) => void {
  return (listener: Listener) => ipcRenderer.on(key, listener)
}

export function bridge(api: unknown): void {
  contextBridge.exposeInMainWorld('electron', api)
}
