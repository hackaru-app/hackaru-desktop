const Mixpanel = require('mixpanel')
const { v4: uuidv4 } = require('uuid')

module.exports = class {
  constructor(token) {
    this.mixpanel = this.init(token)
    this.uuid = uuidv4()
  }

  setUserId(id) {
    this.userId = id
    this.mixpanel?.alias(id, this.uuid)
  }

  removeUserId() {
    this.userId = undefined
    this.uuid = uuidv4()
  }

  track(eventName, props = {}) {
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

  private

  get distinctId() {
    return this.userId || this.uuid
  }

  init(token) {
    if (!token) return
    return Mixpanel.init(token, {
      debug: process.env.NODE_ENV !== 'production',
    })
  }
}
