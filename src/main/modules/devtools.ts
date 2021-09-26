import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer'

export async function initDevtools(): Promise<void> {
  await installExtension(VUEJS_DEVTOOLS)
}
