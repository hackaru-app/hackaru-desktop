import AutoLaunch from 'auto-launch'
import { app } from 'electron'
import { config } from '~/config'

const autoLauncher = new AutoLaunch({
  name: 'hackaru-desktop',
  path: process.platform === 'linux' ? process.env.APPIMAGE : process.execPath,
})

function setEnabled(enabled: boolean): void {
  enabled ? autoLauncher.enable() : autoLauncher.disable()
}

async function syncEnabled() {
  const enabled = config.get('enableAutoLaunch')
  if ((await autoLauncher.isEnabled()) !== enabled) setEnabled(enabled)
}

app.on('ready', syncEnabled)

config.onDidChange('enableAutoLaunch', syncEnabled)
