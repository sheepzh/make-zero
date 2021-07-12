/**
 * Buttons
 */
import { Messages } from ".."

export type ButtonMessage = {
  copy: string
  cancel: string
  copied: string
  dbclick: string
}

const _default: Messages<ButtonMessage> = {
  en: {
    copy: 'Copy',
    cancel: 'Cancel',
    copied: 'Copied successfully',
    dbclick: 'Db-click'
  },
  zh_CN: {
    copy: '复制',
    cancel: '取消',
    copied: '复制成功',
    dbclick: '双击'
  }
}

export default _default