import Vue from 'vue'
import Popup from './AppMain'
import '../plugin/element-ui'
import i18n from '../plugin/i18n'
import router from './router'

import './styles/index.scss' // global css

new Vue({
  el: '#app',
  router,
  i18n,
  render: (h) => h(Popup),
})