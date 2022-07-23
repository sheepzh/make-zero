import { ElMenu, ElMenuItem } from 'element-plus'
import { defineComponent, h } from 'vue'
import { RouteLocationNormalizedLoaded, Router, useRoute, useRouter } from 'vue-router'
import { openGuide } from '../../../zero/common/guide-opener'
import { t, I18nKey } from '../locale'

type MenuItem = {
  title: I18nKey
  route: string
  icon: string
}

const menu: MenuItem[] = [
  {
    title: msg => msg.version.meta.menu,
    route: '/version',
    icon: 'date'
  }
]

export default defineComponent<{}, {}>(() => {
  const route: RouteLocationNormalizedLoaded = useRoute()
  const router: Router = useRouter()

  const openMenu = (newRoutePath: string) => {
    if (route.path !== newRoutePath) {
      router.push(newRoutePath)
    }
  }

  const headMenuItem = () => h(ElMenuItem, { index: '/setting', onClick: () => openMenu('/setting') }, () => h('h2', {}, 'MAKE ZERO'))

  const otherMenuItems = () => menu.map((m: MenuItem) => h(ElMenuItem,
    { index: m.route, onClick: () => openMenu(m.route) },
    {
      default: () => h('i', { class: `el-icon-${m.icon}` }),
      title: () => h('span', {}, t(m.title))
    }
  ))

  const guideMenuItem = () => h(ElMenuItem,
    { index: '/guide', onClick: () => openGuide() },
    {
      default: () => h('i', { class: 'el-icon-notebook-1' }),
      title: () => h('span', {}, t(msg => msg.guide.menuTitle))
    })
  return () => h(ElMenu,
    { defaultActive: route.path, class: 'menu' },
    () => [headMenuItem(), ...otherMenuItems(), guideMenuItem()]
  )
})