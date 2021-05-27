import { ElAside, ElContainer, ElMain } from "element-plus"
import { defineComponent, h, onMounted } from "vue"
import { RouterView } from "vue-router"
import { t } from "../../plugin/i18n"
import Menu from './menu'
import './styles'

export default defineComponent<{}, {}>(() => {
  onMounted(() => document.title = t('guide.meta.title'))
  const asideMenu = () => h(ElAside, {}, () => h(Menu))
  const body = () => h(ElContainer, { id: 'app-body' }, () => h(ElMain, {}, () => h(RouterView)))

  return () => h(ElContainer, {}, () => [asideMenu(), body()])
})