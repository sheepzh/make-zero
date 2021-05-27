import { ElAside, ElContainer, ElMain } from "element-plus"
import { defineComponent, h } from "vue"
import { RouterView } from "vue-router"
import Menu from './menu'

export default defineComponent<{}, {}>(
  () => {
    const asideMenu = () => h(ElAside, {}, () => h(Menu))
    const body = () => h(ElContainer, { id: 'app-body' }, () => h(ElMain, {}, () => h(RouterView)))
    return () => h(ElContainer, {}, () => [asideMenu(), body()])
  }
)