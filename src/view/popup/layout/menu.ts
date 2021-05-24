import { ElMenu, ElMenuItem } from 'element-plus'
import { defineComponent, h } from 'vue'
import { openGuide } from '../../../zero/common/guide-opener'
import { t } from '../../plugin/i18n'

declare class MenuItem {
  title: string
  route: string
  icon: string
}

const menu: MenuItem[] = [
  {
    title: 'version.meta.menu',
    route: '/version',
    icon: 'date'
  }
]


export default defineComponent({
  name: 'Menu',
  setup(_ctx) { },
  methods: {
    openMenu(route: string) {
      if (this.$route.path !== route) {
        this.$router.push(route)
      }
    },
  },
  render(_ctx: any) {
    const headMenuItem = () => h(ElMenuItem, { index: '/setting', onClick: () => _ctx.openMenu('/setting') }, () => h('h2', {}, 'MAKE ZERO'))

    const otherMenuItems = () => menu.map((m: MenuItem) => h(ElMenuItem,
      { index: m.route, onClick: () => _ctx.openMenu(m.route) },
      {
        default: () => h('i', { class: `el-icon-${m.icon}` }),
        title: () => h('span', {}, t(m.title))
      }
    ))

    const guideMenuItem = () => h(ElMenuItem,
      { index: '/guide', onClick: openGuide },
      {
        default: () => h('i', { class: 'el-icon-notebook-1' }),
        title: () => h('span', {}, t('guide.meta.menu'))
      })
    return h(ElMenu,
      { defaultActive: _ctx.$route.path, class: 'menu' },
      () => [headMenuItem(), ...otherMenuItems(), guideMenuItem()]
    )
  }
})