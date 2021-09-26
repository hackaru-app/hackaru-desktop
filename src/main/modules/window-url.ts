import * as path from 'path'
import { URL, pathToFileURL } from 'url'
import { basePath } from '~/modules/base-path'

function getBaseUrl() {
  if (process.env.NODE_ENV === 'production') {
    const indexPath = path.resolve(basePath, 'renderer/index.html')
    return pathToFileURL(indexPath)
  } else {
    return new URL('http://localhost:7865')
  }
}

export function isWindowHostname(input: string): boolean {
  return new URL(input).origin === getBaseUrl().origin
}

export function getWindowUrl(input: string): URL {
  const url = getBaseUrl()
  url.hash = input
  return url
}
