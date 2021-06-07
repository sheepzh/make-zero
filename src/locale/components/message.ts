import { Messages } from "../constant"

/**
 * Message texts
 */
export type MsgMessage = {
  unsupportedWeiboDecAuto: string
  encryptionSuccess: string
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
    encryptionFail: "复制失败: ",
    unknownCipherText: "Sorry 啦，我不认识这个密文",
    decryptionResult: "解密结果",
    decryptionCopied: "复制成功！",
    decryptionCopyFailed: "复制失败！"
  },
  en: {
    unsupportedWeiboDecAuto: "It does not support automatic decryption of Weibo yet.",
    encryptionSuccess: "The ciphertext has been copied to the clipboard!",
    encryptionFail: "Encryption failed: ",
    unknownCipherText: "Can not recognize the ciphertext!",
    decryptionResult: "Decryption Result",
    decryptionCopied: "Copied successfully!",
    decryptionCopyFailed: "Copy failed!"
  }
}

export default _default