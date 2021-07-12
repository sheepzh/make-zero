import { ElMenu, ElMenuItem } from "element-plus"
import { defineComponent, h } from "vue"
import { useRoute, useRouter } from "vue-router"
import { I18nKey, t } from "../locale"

/**
 * Info of menu items
 */
type MenuItem = {
  title: I18nKey
  route: string
}

const menus: MenuItem[] = [
  {
    title: msg => msg.basic.title,
    route: '/basic'
  }, {
    title: msg => msg.autoEncryption.title,
    route: '/auto-encryption'
  }, {
    title: msg => msg.autoDecryption.title,
    route: '/auto-decryption'
  }
]

export default defineComponent<{}, {}>(() => {
  const router = useRouter()
  const currentRoute = useRoute().path
  const menuItems = () => menus.map((item: MenuItem, index: number) => {
    const { route, title } = item
    return h(ElMenuItem,
      { index: route, onClick: () => currentRoute !== route && router.push(route) },
      {
        title: () => h('span', {}, `${index + 1}. ${t(title)}`)
      }
    )
  })
  return () => h(ElMenu, { defaultActive: currentRoute }, menuItems)
})