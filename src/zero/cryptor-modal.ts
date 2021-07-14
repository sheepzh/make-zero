/**
 * Reconstructed @since 1.3.0
 */
import cryptoExecutor from '../service/crypto-executor'
import { write as copy } from 'clipboardy'
/**
 * Replace sweetalert2 with element-plus
 * @since 1.4.1 
 */
import { ElMessage, ElMessageBox } from 'element-plus'
import { MessageParams } from 'element-plus/lib/el-message/src/types'
import { MessageType } from 'element-plus/lib/el-message-box/src/message-box.type'
import 'element-plus/lib/theme-chalk/el-message-box.css'
import 'element-plus/lib/theme-chalk/el-message.css'
import { t2Chrome } from '../util/i18n/chrome/t'

const _alert = (message: string, type: MessageType, useHtml?: Boolean) => {
  const config: MessageParams = { message, duration: 2000, type }
  if (useHtml) {
    config.dangerouslyUseHTMLString = true
    config.duration = 10000
    config.showClose = true
  }
  ElMessage(config)
}

const success = (message: string, useHtml?: Boolean) => _alert(message, 'success', useHtml)

const error = (message: string) => _alert(message, 'error')

/**
 * Encrypt the plaintext and copy to the clipboard
 * 
 * @param plaintext  plaintext
 */
export async function encryptAndMessage(plaintext: string, showPlain?: boolean) {
  const txt = await cryptoExecutor.encrypt(plaintext)
  copy(txt).then(() => {
    const msg = showPlain
      ? t2Chrome(msg => msg.message.encryptionSuccessWithPlain, { plaintext })
      : t2Chrome(msg => msg.message.encryptionSuccess)
    success(msg, showPlain)
  }).catch((e: any) => {
    console.log(e)
    error(t2Chrome(msg => msg.message.encryptionFail) + txt)
  })
}

/**
 * Try to decrypt the cipher text and open modal
 * 
 * @param originText cipher text
 * @param showError  whether to show error if the cipher text is unknown
 * @return true if decrypted, or false
 */
export async function decryptAndMessage(cipherText: string, showError: boolean): Promise<boolean> {
  cipherText = cipherText.trimLeft()
  const txt = await cryptoExecutor.decrypt(cipherText)
  if (txt === cipherText) {
    if (showError) {
      error(t2Chrome(msg => msg.message.unknownCipherText))
    }
    return Promise.resolve(false)
  } else {
    ElMessageBox({
      title: t2Chrome(msg_1 => msg_1.message.decryptionResult),
      message: txt,
      type: 'success',
      showCancelButton: true,
      cancelButtonText: t2Chrome(msg_2 => msg_2.button.cancel),
      confirmButtonText: t2Chrome(msg_3 => msg_3.button.copy)
    }).then(() => {
      copy(txt)
        .then(() => success(t2Chrome(msg_4 => msg_4.message.decryptionCopied)))
        .catch(() => error(t2Chrome(msg_5 => msg_5.message.decryptionCopyFailed)))
    }).catch(() => { })
    return true
  }
}