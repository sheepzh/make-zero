import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('./home/index')
  },
  {
    path: '/zero',
    component: () => import('./zero/index'),
  },
]

export default new VueRouter({ routes })
