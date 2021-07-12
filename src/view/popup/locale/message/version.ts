import { Messages } from "../../../../util/i18n"

export type VersionMessage = {
  meta: { menu: string }
  "1_0_0": { 0: string }
  "1_0_1": { 0: string }
  "1_1_0": {
    0: string
    1: string
  }
  "1_1_1": {
    0: string
    1: string
  }
  "1_1_2": {
    0: string
    1: string
  }
  "1_2_0": {
    0: string
    1: string
  }
  "1_3_0": {
    0: string
    1: string
  }
  "1_3_1": { 0: string }
  "1_4_0": { 0: string }
  "1_4_1": { 0: string }
  "1_5_0": {
    0: string
    1: string
  }
  "1_5_1": { 0: string }
  "1_5_2": { 0: string }
  "1_6_0": { 0: string }
  "1_6_1": { 0: string }
}

const _default: Messages<VersionMessage> = {
  en: {
    meta: { menu: "Versions" },
    "1_0_0": {
      "0": "Release really"
    },
    "1_0_1": {
      "0": "Alert plaintext directly"
    },
    "1_1_0": {
      "0": "Double click to decrypt",
      "1": "Decrypt automatically"
    },
    "1_1_1": {
      "0": "Support new ciphertext format",
      "1": "Decrypt ciphertext in <span>"
    },
    "1_1_2": {
      "0": "Support lofter.com",
      "1": "Support ciphertext element inserted dymically"
    },
    "1_2_0": {
      "0": "Internationalized, and both Chinese and English are supported",
      "1": "Errors occur while decrypting cypher-like texts"
    },
    "1_3_0": {
      "0": "Change the logo",
      "1": "Support Ctrl+, to quickly encrypt and decrypt the selected text"
    },
    "1_3_1": {
      "0": "Fix manual decription bug caused by FireFox's bug"
    },
    "1_4_0": {
      "0": "Add guide page."
    },
    "1_4_1": {
      "0": "Optimize package size."
    },
    "1_5_0": {
      "0": "Support new ciphertext format: morse code",
      "1": "Needn't refresh pages any more after settings changed"
    },
    "1_5_1": {
      "0": "Fix the error that some text was mistaken for Morse code"
    },
    "1_5_2": {
      "0": "Fix some bugs of cryptor1 and cryptor2"
    },
    "1_6_0": {
      "0": "Support new ciphertext format: Cherus"
    },
    "1_6_1": {
      "0": "Needn't refresh pages after changing auto-encrption any more"
    }
  },
  zh_CN: {
    meta: { menu: "更新历史" },
    "1_0_0": {
      "0": "终于发布啦！！"
    },
    "1_0_1": {
      "0": "解密后自动弹窗显示明文。"
    },
    "1_1_0": {
      "0": "双击密文快捷解密",
      "1": "密文自动解密"
    },
    "1_1_1": {
      "0": "支持使用多种密文格式",
      "1": "修复 span 标签内密文识别失败的问题"
    },
    "1_1_2": {
      "0": "支持 lofter.com",
      "1": "支持解密动态插入的密文块"
    },
    "1_2_0": {
      "0": "新增国际化，支持简体中文和英文",
      "1": "修复已知 bug"
    },
    "1_3_0": {
      "0": "支持Ctrl+,快捷加解密选中的明文/密文",
      "1": "更改图标和 Logo"
    },
    "1_3_1": {
      "0": "修复由火狐浏览器自身 bug 导致手动解密失败的问题"
    },
    "1_4_0": {
      "0": "增加引导页。"
    },
    "1_4_1": {
      "0": "优化安装包体积。"
    },
    "1_5_0": {
      "0": "支持新的密文风格：摩斯码",
      "1": "修改设置信息后不用再刷新页面"
    },
    "1_5_1": {
      "0": "修复某些文字被误认为摩斯码的错误",
    },
    "1_5_2": {
      "0": "修复加密器1和加密器2的一些 bug"
    },
    "1_6_0": {
      "0": "支持新的密文风格：切噜语"
    },
    "1_6_1": {
      "0": "修改自动加密设置后不用刷新页面即可生效"
    }
  }
}

export default _default