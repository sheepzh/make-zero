/**
 * Used for the context menu items of chrome
 */
import { Messages } from ".."

export type ContextMenuMessage = {
  encrypt: string
  decrypt: string
}

const _default: Messages<ContextMenuMessage> = {
  en: {
    encrypt: 'Encrypt',
    decrypt: 'Decrypt'
  },
  zh_CN: {
    encrypt: '加密',
    decrypt: '解密'
  }
}

export default _default