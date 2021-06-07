import { Messages } from "../constant"

/**
 * Used in the setting page
 */
export type SettingMessage = {
  meta: { menu: string }
  password: { title: string }
  auto: {
    encryptLabel: string
    encryptTip: string
    decryptLabel: string
    decryptTip: string
  },
  cipherType: {
    label: string
    remark: {
      1: string
      2: string
      3: string
      4: string
    }
  }
}

const _default: Messages<SettingMessage> = {
  en: {
    meta: { menu: 'Settings' },
    password: { title: 'Password' },
    auto: {
      encryptLabel: 'Auto-Enc.',
      encryptTip: 'Encrypt plaintexts in the input box automatically.',
      decryptLabel: 'Auto-Dec.',
      decryptTip: 'Decrypt ciphertexts after pages loaded automatically.'
    },
    cipherType: {
      label: 'Ciphertext',
      remark: {
        1: 'Fixed and short',
        2: 'Random and short',
        3: 'Morse code',
        4: 'Cherus'
      }
    }
  },
  zh_CN: {
    meta: { menu: '设置面板' },
    password: { title: '密码' },
    auto: {
      encryptLabel: '自动加密',
      encryptTip: '网页的输入框在输入完成之后后会自动加密',
      decryptLabel: '自动解密',
      decryptTip: '网页加载完成之后自动识别密文并解密'
    },
    cipherType: {
      label: '密文风格',
      remark: {
        1: '等长唯一',
        2: '等长随机',
        3: '摩斯码',
        4: '切噜语'
      }
    }
  },
}

export default _default