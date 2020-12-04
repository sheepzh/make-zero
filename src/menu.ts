import { AutoFiller } from './components/sns-zero/auto-filler'

export class MenuDefine {
  create() {
    chrome.contextMenus.create({
      type: 'normal',
      title: '解码',
      id: 'Zero-encryt',
      contexts: ['all'],
      onclick: () => {
        chrome.tabs.query(
          { currentWindow: true, active: true },
          function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { tag: new AutoFiller().msgTag, data: false }, res => console.log(res))
          }
        )
      }
    }, function () {
      console.log('contextMenus are create.')
    })

    chrome.contextMenus.create({
      type: 'normal',
      title: '加码',
      id: 'Zero-decrypt',
      contexts: ['all'],
      onclick: () => {
        chrome.tabs.query(
          { currentWindow: true, active: true },
          function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { tag: new AutoFiller().msgTag, data: true }, res => console.log(res))
          }
        )
      }
    }, function () {
      console.log('contextMenus are create.')
    })
  }
}