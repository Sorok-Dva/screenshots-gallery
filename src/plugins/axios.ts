import { VueConstructor } from 'vue'
import Axios from 'axios'
import store from '@/store'


const requestHandler = async (config: { headers: { [x: string]: string }; url: any; params: any }) => {
  try {
    const tokenData = store.getters['user/tokenData']
    if (tokenData) {
      config.headers['Authorization'] =
        `${tokenData.tokenType} ${tokenData.accessToken}`
    }
    let key = config.url
    if (config.params) {
      const params = JSON.stringify(config.params)
      key += params
    }
    return config
  } catch (e) {
    return config
  }
}

export const $api = Axios.create({
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json'
  }
})


export default {
  install(Vue: VueConstructor) {
    Vue.prototype.$api = $api
  }
}
