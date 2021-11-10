import * as path from 'path'
import { URL, pathToFileURL } from 'url'
import { BrowserWindowConstructorOptions } from 'electron'
import { srcDir } from '~/modules/src-dir'

function getBaseUrl(): URL {
  if (process.env.NODE_ENV === 'production') {
    const indexPath = path.resolve(srcDir, 'renderer/index.html')
    return pathToFileURL(indexPath)
  } else {
    return new URL('http://localhost:7865')
  }
}

export function isWindowHost(input: string): boolean {
  return new URL(input).origin === getBaseUrl().origin
}

export function getWindowUrl(input: string): string {
  const url = getBaseUrl()
  url.hash = input
  return `${url}`
}

export function buildWindowOptions(
  preload: string,
  options: BrowserWindowConstructorOptions
): BrowserWindowConstructorOptions {
  return {
    ...options,
    webPreferences: {
      ...options.webPreferences,
      nodeIntegration: false,
      contextIsolation: true,
      disableBlinkFeatures: 'Auxclick',
      sandbox: true,
      preload: path.resolve(srcDir, 'main/preloads', `${preload}.js`),
    },
  }
}
