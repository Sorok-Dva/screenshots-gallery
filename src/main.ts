import Vue from 'vue'
import Notifications from 'vue-notification'
import App from './App.vue'

import { i18n } from './i18n'
import router from './router'
import translate from './plugins/translate'
import store from './store'

Vue.use(Notifications)
Vue.config.productionTip = false
Vue.prototype.$i18nRoute = translate.i18nRoute.bind(translate)

new Vue({
  name: 'Paste Your Screens',
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
