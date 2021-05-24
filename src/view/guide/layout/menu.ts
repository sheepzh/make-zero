import { ElMenu, ElMenuItem } from "element-plus"
import { defineComponent, h } from "vue"
import { t } from "../../plugin/i18n"

/**
 * Info of menu items
 */
declare class MenuItem {
  title: string
  route: string
}

const menus: MenuItem[] = [
  {
    title: 'guide.basic.title',
    route: '/basic'
  }, {
    title: 'guide.autoEncryption.title',
    route: '/auto-encryption'
  }, {
    title: 'guide.autoDecryption.title',
    route: '/auto-decryption'
  }
]

export default defineComponent({
  name: 'GuideMenu',
  render(_ctx: any) {
    const menuItems = () => menus.map((item: MenuItem, index: number) => {
      const { route, title } = item
      return h(ElMenuItem,
        { index: route, onClick: () => _ctx.$route.path !== route && _ctx.$router.push(route) },
        {
          title: () => h('span', {}, `${index + 1}. ${t(title)}`)
        }
      )
    })
    return h(ElMenu, { defaultActive: _ctx.$route.path }, menuItems)
  }
})