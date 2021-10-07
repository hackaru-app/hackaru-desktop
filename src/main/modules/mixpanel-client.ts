import * as Mixpanel from 'mixpanel'
import { v4 as uuidv4 } from 'uuid'

export class MixpanelClient {
  private uuid: string
  private mixpanel: Mixpanel.Mixpanel | undefined
  private userId: string | undefined

  constructor() {
    this.mixpanel = this.init(process.env.MIXPANEL_PROJECT_TOKEN)
    this.uuid = uuidv4()
  }

  public setUserId(id: string): void {
    this.userId = id
    this.mixpanel?.alias(id, this.uuid)
  }

  public removeUserId(): void {
    this.userId = undefined
    this.uuid = uuidv4()
  }

  public track(eventName: string, props: Mixpanel.Callback): void {
    this.mixpanel?.track(eventName, {
      $user_id: this.userId,
      distinct_id: this.distinctId,
      standalone: false,
      repository: 'hackaru-desktop',
      release: process.env.npm_package_version,
      platform: process.platform,
      ...props,
    })
  }

  private get distinctId(): string {
    return this.userId || this.uuid
  }

  private init(token?: string): Mixpanel.Mixpanel | undefined {
    if (!token) return
    return Mixpanel.init(token, {
      debug: process.env.NODE_ENV !== 'production',
    })
  }
}
