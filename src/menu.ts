import { t2Chrome } from './util/i18n/chrome/t'
import ContextMenuListener from './zero/context-menu-listener'

export class MenuDefine {
  create() {
    chrome.contextMenus.create({
      type: 'normal',
      title: t2Chrome(msg => msg.contextMenu.decrypt),
      id: 'Zero-encrypt',
      contexts: ['all'],
      onclick: (info, tab) => {
        chrome.tabs.sendMessage(tab.id, { tag: new ContextMenuListener().msgTag, data: false }, res => console.log(res))
      }
    }, function () {
      console.log('contextMenus are create.')
    })

    chrome.contextMenus.create({
      type: 'normal',
      title: t2Chrome(msg => msg.contextMenu.encrypt),
      id: 'Zero-decrypt',
      contexts: ['all'],
      onclick: (info, tab) => {
        chrome.tabs.sendMessage(tab.id, { tag: new ContextMenuListener().msgTag, data: true }, res => console.log(res))
      }
    }, function () {
      console.log('contextMenus are create.')
    })
  }
}