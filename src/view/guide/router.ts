import { App } from 'vue'
import { createRouter, createWebHashHistory, Router, RouteRecordRaw } from 'vue-router'



const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/basic'
  }, {
    path: '/basic',
    component: () => import('./components/basic')
  }, {
    path: '/auto-encryption',
    component: () => import('./components/auto-encryption')
  }, {
    path: '/auto-decryption',
    component: () => import('./components/auto-decryption')
  }
]

const router: Router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default function installRouter(app: App): void {
  app.use(router)
}
