/**
 * Used for the context menu items of chrome
 */
import { Messages } from ".."

export type ContextMenuMessage = {
  encrypt: string
  decrypt: string
  encryptClipboard: string
  decryptClipboard: string
}

const _default: Messages<ContextMenuMessage> = {
  en: {
    encrypt: 'Encrypt the selection',
    decrypt: 'Decrypt the selection',
    encryptClipboard: 'Encrypt the contents of the clipboard',
    decryptClipboard: 'Decrypt the contents of the clipboard'
  },
  zh_CN: {
    encrypt: '加密选中内容',
    decrypt: '解密选中内容',
    encryptClipboard: '加密剪切板里的内容',
    decryptClipboard: '解密剪切板里的内容'
  }
}

export default _default