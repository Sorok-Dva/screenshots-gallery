import Vue from 'vue'
import App from './App.vue'
import Notifications from 'vue-notification'

import { i18n } from './i18n'
import router from './router'
import translate from './plugins/translate'
import store from './store'

Vue.config.productionTip = false
Vue.prototype.$i18nRoute = translate.i18nRoute.bind(translate)

Vue.use(Notifications)

new Vue({
  name: 'Paste Your Screens',
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
