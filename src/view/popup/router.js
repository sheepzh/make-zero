import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/engine',
    component: () => import('./engine/index'),
  },
  {
    path: '/sns',
    component: () => import('./sns-zero/index'),
  },
]

export default new VueRouter({ routes })
