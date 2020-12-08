import Vue from 'vue'
import Popup from './view/popup'
import './view/plugin/element-ui'
import i18n from './view/plugin/i18n'
import router from './view/popup/router'

import './styles/index.scss' // global css

new Vue({
  el: '#app',
  router,
  i18n,
  render: (h) => h(Popup),
})
