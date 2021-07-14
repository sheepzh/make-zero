import { Messages } from ".."

/**
 * Message texts
 */
export type MsgMessage = {
  unsupportedWeiboDecAuto: string
  encryptionSuccess: string
  encryptionSuccessWithPlain: string
  encryptionFail: string
  unknownCipherText: string
  decryptionResult: string
  decryptionCopied: string
  decryptionCopyFailed: string
}

const _default: Messages<MsgMessage> = {
  zh_CN: {
    unsupportedWeiboDecAuto: "Sorry 啦，暂时还不支持微博自动解密哦！",
    encryptionSuccess: "密文已经复制到剪切板！",
    encryptionSuccessWithPlain: "<p>密文已经复制到剪切板，明文如下：</p></br><p>{plaintext}</p>",
    encryptionFail: "复制失败: ",
    unknownCipherText: "Sorry 啦，我不认识这个密文",
    decryptionResult: "解密结果",
    decryptionCopied: "复制成功！",
    decryptionCopyFailed: "复制失败！"
  },
  en: {
    unsupportedWeiboDecAuto: "It does not support automatic decryption of Weibo yet.",
    encryptionSuccess: "The cipher text has been copied to the clipboard!",
    encryptionSuccessWithPlain: "<p>The cipher text has been copied to the clipboard, and the plaintext is</p></br><p>{plaintext}</p>",
    encryptionFail: "Encryption failed: ",
    unknownCipherText: "Can not recognize the cipher text!",
    decryptionResult: "Decryption Result",
    decryptionCopied: "Copied successfully!",
    decryptionCopyFailed: "Copy failed!"
  }
}

export default _default