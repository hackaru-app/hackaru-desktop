import path from 'path'
import { Application } from 'spectron'
import electronPath from 'electron'
import testId from '../__helpers__/test-id'

describe('App', () => {
  let app

  jest.setTimeout(30000)

  beforeEach(async () => {
    app = new Application({
      path: electronPath,
      headless: true,
      args: [path.join(__dirname, '../../dist/main/main')],
      env: { DEBUG: 1 },
    })
    await app.start()
  })

  afterEach(() => {
    if (app && app.isRunning()) app.stop()
  })

  it('shows auth-button', async () => {
    const button = await app.client.$(testId('auth-button'))
    const existing = await button.isExisting()
    expect(existing).toBe(true)
  })
})
