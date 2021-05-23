import { App } from 'vue'
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/setting'
  },
  {
    path: '/setting',
    component: () => import('./setting/index')
  },
  {
    path: '/version',
    component: () => import('./version/index')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})


export default function installRouter(app: App): void {
  app.use(router)
}
