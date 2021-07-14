import { t2Chrome } from './util/i18n/chrome/t'
import ContextMenuListener, { ContextMenuMessageInfo } from './zero/context-menu-listener'

/**
 * Sent the encryption of decryption command to the content script
 * @since 1.7.0
 */
function sendCommand(tab: chrome.tabs.Tab, data: ContextMenuMessageInfo) {
  chrome.tabs.sendMessage(tab.id, { tag: new ContextMenuListener().msgTag, data }, res => console.log(res))
}

function createMenu() {
  chrome.contextMenus.create({
    type: 'normal',
    title: t2Chrome(msg => msg.contextMenu.decrypt),
    id: 'Zero-encrypt',
    contexts: ['all'],
    onclick: (_info, tab) => sendCommand(tab, { enOrD: 'decrypt', origin: 'selection' })
  }, function () {
    console.log('contextMenus are create.')
  })

  chrome.contextMenus.create({
    type: 'normal',
    title: t2Chrome(msg => msg.contextMenu.encrypt),
    id: 'Zero-decrypt',
    contexts: ['all'],
    onclick: (_info, tab) => sendCommand(tab, { enOrD: 'encrypt', origin: 'selection' })
  }, function () {
    console.log('contextMenus are create.')
  })

  /**
   * @since 1.7.0
   */
  chrome.contextMenus.create({
    type: 'normal',
    title: t2Chrome(msg => msg.contextMenu.decryptClipboard),
    id: 'Zero-decrypt-clipboard',
    contexts: ['all'],
    onclick: (_info, tab) => sendCommand(tab, { enOrD: 'decrypt', origin: 'clipboard' })
  })

  /**
   * @since 1.7.0
   */
  chrome.contextMenus.create({
    type: 'normal',
    title: t2Chrome(msg => msg.contextMenu.encryptClipboard),
    id: 'Zero-encrypt-clipboard',
    contexts: ['all'],
    onclick: (_info, tab) => sendCommand(tab, { enOrD: 'encrypt', origin: 'clipboard' })
  })
}

export default createMenu