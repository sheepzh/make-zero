/**
 * App info
 */
import { Messages } from "../constant"

export type AppMessage = {
  name: string
  description: string
}

const _default: Messages<AppMessage> = {
  en: {
    name: "Make Zero - Text Encryption",
    description: 'Encrypt & decrypt your texts in any site.'
  },
  zh_CN: {
    name: "Make Zero - 文字加密工具",
    description: '便捷地加解密你在网络上的文本，只有知晓密码的人才能阅读。'
  }
}

export default _default