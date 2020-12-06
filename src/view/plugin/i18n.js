import Vue from 'vue'
import VueI18n from 'vue-i18n'
import messages from '../../locale/index'
Vue.use(VueI18n)

console.log(messages)

export default new VueI18n({
  messages,
  locale: 'zhCn',
})
