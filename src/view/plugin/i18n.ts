import { vueMessages, defaultLocale } from '../../locale/index'


// Standardize the locale code according to the Chrome locale code
const chrome2I18n = {
  'zh-CN': 'zh_CN',
  'zh-TW': 'zh_TW',
  'en-US': 'en',
  'en-GB': 'en'
}

/**
 * Codes returend by getUILanguage() are defined by Chrome browser
 * @see https://src.chromium.org/viewvc/chrome/trunk/src/third_party/cld/languages/internal/languages.cc 
 * But supported locale codes in Chrome extension
 * @see https://developer.chrome.com/docs/webstore/i18n/#localeTable
 * 
 * They are different, so translate
 */
const chromeLocale2ExtensionLocale = (chromeLocale: string) => {
  if (!chromeLocale) {
    return defaultLocale
  }
  return chrome2I18n[chromeLocale] || chromeLocale
}

const message: any = vueMessages[chromeLocale2ExtensionLocale(chrome.i18n.getUILanguage())] || {}

export default function t(key: string, param?: any): string {
  const levels = key.split('.')
  let currentMessage: any = message
  for (let i in levels) {
    const level = levels[i]
    currentMessage = currentMessage[level]
    if (!currentMessage) {
      return key
    }
  }
  let result: string = typeof currentMessage === 'string' ? currentMessage : JSON.stringify(currentMessage)
  if (param) {
    Object.keys(param).forEach(key => {
      result = (result as string).replace(`{${key}}`, param[key])
    })
  }
  return result
}
