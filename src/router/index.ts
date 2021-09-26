import Vue from 'vue'
import VueRouter, { RawLocation, RedirectOption, RouteConfig } from 'vue-router'
import translate from '@/plugins/translate'

const load = (component : string) => {
  return () => import(`@/views/${ component }.vue`)
}

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [{
  path: '/:locale',
  component: {
    template: '<router-view></router-view>',
  },
  beforeEnter: translate.routeMiddleware,
  children: [{
    path: '',
    name: 'Home',
    component: load('Home'),
  }, {
    path: 'about',
    name: 'About',
    component: load('About'),
  }, {
    path: 'register',
    name: 'Register',
    component: load('Register'),
  }],
  }, {
    path: '*',
    redirect: (): RawLocation => {
      return translate.defaultLocale as RawLocation;
    },
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
