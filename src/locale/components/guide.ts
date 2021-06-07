/**
 * Used for guide page
 */

import { Messages } from "../constant"

type BasicMessage = {
  title: string
  currentPassword: string
  pasteError: string
  clickMe: string
  shortcut: string
  encrypt: {
    title: string
    selectText: string
    rightClick: string
    paste: string
    pasteInputHolder: string
    pasteButton: string
  }
  decrypt: {
    title: string
    selectText: string
    ciphertextPrefix: string
    rightClick1: string
    rightClick2: string
  }
}

type AutoEncryptionMessage = {
  title: string
  alertIfOn: string
  alertIfOff: string
  form1: string
  form2: string
}

type AutoDecryptionMessage = {
  title: string
  alertIfOn: string
  alertIfOff: string
}

export type GuideMessage = {
  period: string
  meta: {
    menu: string
    title: string
  }
  welcome: string
  basic: BasicMessage
  autoEncryption: AutoEncryptionMessage
  autoDecryption: AutoDecryptionMessage
}

const _default: Messages<GuideMessage> = {
  en: {
    period: '.',
    meta: { menu: 'Guidebook', title: 'Guidebook | Make Zero' },
    welcome: "Welcome to use Make Zero! This page will guide you to enjoy it.😁",
    basic: {
      title: "Basic Usage",
      currentPassword: 'The current password is ',
      pasteError: 'Failed to paste, please operate manually',
      clickMe: "CLICK ME",
      shortcut: '[Ctrl] & [,]',
      encrypt: {
        title: 'How to Encrypt?',
        selectText: "Please select texts you want to encrypt, or ",
        rightClick: "Press {shortcut} to encrypt it. Or move the cursor to it, right click and choose the menu item {menuItemPath} in pop-up box.",
        paste: "You can paste the ciphertext in the input box below, or click {btn} button.",
        pasteInputHolder: 'Paste here',
        pasteButton: "Paste"
      },
      decrypt: {
        title: 'How to Decrypt?',
        selectText: "Ciphertexts start with {ciphertextPrefix}, you can {clickMe} or move the cursor on follow ciphertext.",
        ciphertextPrefix: '\'z\' + 2-bits number',
        rightClick1: "If you selected the ciphertext, press {shortcut} or move the cursor to it and right click and choose the menu item {menuItemPath} in pop-up box to decrypt it.",
        rightClick2: "If the cursor has been put on the ciphertext, double click."
      }
    },

    autoEncryption: {
      title: 'Auto-encryption',
      alertIfOn: 'Automatic encryption has been on. Please enter texts in the below input box in which the content will be automatically encrypted after finish.',
      alertIfOff: 'Automatic encryption has not been on yet, please switch it in the settings panel, and then refresh this page.',
      form1: 'Title',
      form2: 'Content'
    },
    autoDecryption: {
      title: 'Auto-decryption',
      alertIfOn: 'Automatic decryption is on. So you can see the plaintext after this page loads completely. You can try to turn it off in the settings panel and refresh this page.',
      alertIfOff: 'Automatic decryption is off, So the ciphertext is shown. You can try to turn it on in the settings panel and refresh this page.',
    }
  },
  zh_CN: {
    period: '。',
    meta: { menu: '使用指南', title: '使用指南 | Make Zero' },
    welcome: "欢迎使用 Make Zero ！！！这个页面会引导你怎么在网上快乐冲浪。😁",
    basic: {
      title: "基本用法",
      currentPassword: '当前密码：',
      pasteError: '粘贴失败，请手动操作',
      shortcut: '【Ctrl】和【,】',
      clickMe: "👆我",
      encrypt: {
        title: '怎么加密？',
        selectText: "请先划取你想加密的文字，或者 ",
        rightClick: "按下 {shortcut} 键加密。或者将鼠标放在选中的文字上，右击，点击弹出框里的 {menuItemPath} 选项。",
        paste: "你可以在下面输入框里粘贴刚才自动复制的密文，或者点击{btn}。",
        pasteInputHolder: 'Ctrl + V',
        pasteButton: "粘贴"
      },
      decrypt: {
        title: '怎么解密？',
        selectText: '你可以把鼠标移动至像下面这样以 "{ciphertextPrefix}" 开头的密文上，或者{clickMe}。',
        ciphertextPrefix: 'z+两位数字',
        rightClick1: "如果你选取了密文，可以按下 {shortcut} 键解密，或者将鼠标放在选中的密文上，右击，点击弹出框里的 {menuItemPath} 选项。",
        rightClick2: "如果你已经将鼠标放在了密文上，请双击。"
      }
    },
    autoEncryption: {
      title: '自动加密',
      alertIfOn: '自动加密已经开启，请在下面输入框中输入任意文字，退出输入框之后，框内内容会自动变成密文。',
      alertIfOff: '自动加密未开启，请在设置面板勾选，然后刷新该页面。',
      form1: '文章标题',
      form2: '文章内容'
    },
    autoDecryption: {
      title: '自动解密',
      alertIfOn: '自动解密功能已开启。因此，您可以在此页面加载完成后看到纯文本。您可以在控制面板中将其关闭，然后刷新该页面。',
      alertIfOff: '自动解密功能已关闭，因此显示了密文。 您可以尝试在设置面板中将其打开，然后刷新此页面。',
    }
  }
}

export default _default