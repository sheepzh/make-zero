export default {
  en: {
    meta: { menu: 'Settings' },
    password: { title: 'Password' },
    auto: {
      encryptLabel: 'Auto Enc.',
      encryptTip: 'If the following switch is open, texts in the inputs of all the sites will be encrypted automaticly',
      decryptLabel: 'Auto Dec.',
      decryptTip: 'If the following switch is open, texts between the <p> tags all the sites will be decrypted automaticly'
    },
    cipherType: {
      label: 'Cipher Format',
      remark: {
        1: 'Fixed and short',
        2: 'Random and short',
        3: 'One natural language'
      }
    }
  },
  zhCn: {
    meta: { menu: '设置' },
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
        3: '自然语言'
      }
    }
  },
}
