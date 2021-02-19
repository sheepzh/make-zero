import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('./home/index')
  },
  {
    path: '/setting',
    component: () => import('./setting/index')
  },
  {
    path: '/contact',
    component: () => import('./contact/index')
  }
]

export default new VueRouter({ routes })
