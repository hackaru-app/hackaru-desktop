import { app, session } from 'electron'
import { isWindowHost } from '~/modules/window'

app.on('ready', () => {
  session.defaultSession.setPermissionRequestHandler(
    (_webContents, _permission, send) => {
      send(false)
    }
  )
})

app.on('web-contents-created', (_event, contents) => {
  contents.on('will-navigate', (event, url) => {
    if (!isWindowHost(url)) {
      event.preventDefault()
    }
  })
  contents.setWindowOpenHandler(() => {
    return { action: 'allow' }
  })
})
