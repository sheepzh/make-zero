import { router, ChromeMessage } from "./messages"

export const keyPathOf = (key: (root: ChromeMessage) => string) => key(router)

// Bug of chrome： 
// chrome.i18n.getMessage may not work in background
// @see https://stackoverflow.com/questions/6089707/calling-chrome-i18n-getmessage-from-a-content-script
export const t2Chrome = (key: (root: ChromeMessage) => string, param?: any) => {
  let msg = chrome.i18n.getMessage(keyPathOf(key))
  if (param && typeof param === 'object') {
    Object.entries(param).forEach(([key, val]) => {
      const placeholder = `{${key}}`
      msg = msg.replace(placeholder, (val || '').toString())
    })
  }
  return msg
}