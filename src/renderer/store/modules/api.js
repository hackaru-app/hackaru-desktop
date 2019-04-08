import u from 'updeep'
import axios from 'axios'
import i18n from '../../i18n'
import camelcaseKeys from 'camelcase-keys'
import snakecaseKeys from 'snakecase-keys'

const instance = axios.create({
  timeout: 5000,
  headers: {
    'crossDomain': true
  }
})

export const actions = {
  async request ({ state, rootGetters }, config) {
    const res = await instance.request(
      u(config, {
        baseURL: rootGetters['auth/getApiUrl'],
        headers: { 'Accept-Language': i18n.locale },
        data: config.data && snakecaseKeys(config.data)
      })
    )
    return {
      data: camelcaseKeys(res.data || {}),
      headers: res.headers
    }
  }
}

export default {
  actions
}
