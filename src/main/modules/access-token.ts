import * as keytar from 'keytar'

const service: string = `hackaru-desktop-${process.env.NODE_ENV}`
const account: string = 'current-user'

export function storeAccessToken(accessToken: string): Promise<void> {
  return keytar.setPassword(service, account, accessToken)
}

export function restoreAccessToken(): Promise<string | null> {
  return keytar.getPassword(service, account)
}

export function removeAccessToken(): Promise<boolean> {
  return keytar.deletePassword(service, account)
}
