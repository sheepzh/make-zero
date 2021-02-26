import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/basic'
  }, {
    path: '/basic',
    component: () => import('./components/Basic')
  }, {
    path: '/auto-encryption',
    component: () => import('./components/AutoEncryption')
  }, {
    path: '/auto-decryption',
    component: () => import('./components/AutoDecryption')
  }
]

export default new VueRouter({ routes })
