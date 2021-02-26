import Vue from 'vue'
import Guide from './AppMain'
import i18n from '../plugin/i18n'
import '../plugin/element-ui'
import router from './router'

import './styles/index.scss' // global css

new Vue({
  el: '#app',
  router,
  i18n,
  render: (h) => h(Guide),
})