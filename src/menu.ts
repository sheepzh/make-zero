import { AutoFiller } from './components/sns-zero/auto-filler'

export class MenuDefine {
  create() {
    chrome.contextMenus.create({
      type: 'normal',
      title: '解密',
      id: 'Zero-encryt',
      contexts: ['all'],
      onclick: (info, tab) => {
        chrome.tabs.sendMessage(tab.id, { tag: new AutoFiller().msgTag, data: false }, res => console.log(res))
      }
    }, function () {
      console.log('contextMenus are create.')
    })

    chrome.contextMenus.create({
      type: 'normal',
      title: '加密',
      id: 'Zero-decrypt',
      contexts: ['all'],
      onclick: (info, tab) => {
        chrome.tabs.sendMessage(tab.id, { tag: new AutoFiller().msgTag, data: true }, res => console.log(res))
      }
    }, function () {
      console.log('contextMenus are create.')
    })
  }
}