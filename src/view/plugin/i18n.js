import Vue from 'vue'
import VueI18n from 'vue-i18n'
import messages from '../../locale/index'
Vue.use(VueI18n)

/**
 * chrome codes at
 * https://src.chromium.org/viewvc/chrome/trunk/src/third_party/cld/languages/internal/languages.cc
 */
const chromeLangCode = {
  en: 'en',
  zh: 'zhCn',
  'zh-CN': 'zhCn',
}

const option = {
  messages,
  locale: chromeLangCode[chrome.i18n.getUILanguage()] || 'zhCn',
}

export default new VueI18n(option)
