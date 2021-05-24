/**
 * Reconstructed @since 1.3.0
 */
import cryptor from './cryptor'
import { write as copy } from 'clipboardy'
/**
 * Replace sweetalert2 with element-plus
 * @since 1.4.1 
 */
import { ElMessage, ElMessageBox } from 'element-plus'
import { MessageType } from 'element-plus/lib/el-message-box/src/message-box.type'
import 'element-plus/lib/theme-chalk/el-message-box.css'
import 'element-plus/lib/theme-chalk/el-message.css'

const _alert = (message: string, type: MessageType) => ElMessage({ message, duration: 2000, type })

const success = (message: string) => _alert(message, 'success')

const error = (message: string) => _alert(message, 'error')

/**
 * Encrypt the plaintext and copy to the clipboard
 * 
 * @param plaintext  plaintext
 */
export function encryptAndMessage(plaintext: string) {
  cryptor.encrypt(plaintext, txt => {
    copy(txt).then(() => {
      success(chrome.i18n.getMessage("message_encryptionSuccess"))
    }).catch((e: any) => {
      console.log(e)
      error(chrome.i18n.getMessage("message_encryptionFail") + txt)
    })
  })
}

/**
 * Try to decrypt the ciphertext and open modal
 * 
 * @param originText ciphertext
 * @param showError  whether to show error if the ciphertext is unknown
 * @return true if decrypted, or false
 */
export function decryptAndMessage(ciphertext: string, showError: boolean, callback?: (success: boolean) => void): void {
  ciphertext = ciphertext.trimLeft()
  const txt = cryptor.decrypt(ciphertext, txt => {
    if (txt === ciphertext) {
      if (showError) {
        error(chrome.i18n.getMessage("message_unknownCipherText"))
      }
      callback && callback(false)
    } else {
      ElMessageBox({
        title: chrome.i18n.getMessage('message_decryptionResult'),
        message: txt,
        type: 'success',
        showCancelButton: true,
        cancelButtonText: chrome.i18n.getMessage('button_cancel'),
        confirmButtonText: chrome.i18n.getMessage('button_copy')
      }).then(() => {
        copy(txt)
          .then(() => success(chrome.i18n.getMessage("message_decryptionCopied")))
          .catch(() => error(chrome.i18n.getMessage("message_decryptionCopyFailed")))
      }).catch(() => { })
      callback && callback(true)
    }
  })
}