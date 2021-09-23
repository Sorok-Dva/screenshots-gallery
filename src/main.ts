import Vue from 'vue'
import VueI18n from 'vue-i18n'
// import { messages, defaultLocale } from '@/i18n'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false
Vue.use(VueI18n)

const i18n = new VueI18n({
  messages: {},
  locale: 'en-US',
  fallbackLocale: 'en-US',
})

new Vue({
  name: 'Paste Your Screens',
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
