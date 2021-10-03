import { BrowserWindow, BrowserWindowConstructorOptions } from 'electron'

export class SingleWindow {
  private window?: BrowserWindow
  private options: BrowserWindowConstructorOptions

  constructor(options: BrowserWindowConstructorOptions) {
    this.options = options
  }

  public ensure(init: (window: BrowserWindow) => void): BrowserWindow {
    if (this.window) return this.window

    this.window = new BrowserWindow(this.options)
    this.window.on('closed', () => {
      this.window = undefined
    })
    init(this.window)
    return this.window
  }
}
