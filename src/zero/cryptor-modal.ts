/**
 * Reconstructed @since 1.3.0
 */
import cryptionExcutor from '../service/cryption-excutor'
import { write as copy } from 'clipboardy'
/**
 * Replace sweetalert2 with element-plus
 * @since 1.4.1 
 */
import { ElMessage, ElMessageBox } from 'element-plus'
import { MessageType } from 'element-plus/lib/el-message-box/src/message-box.type'
import 'element-plus/lib/theme-chalk/el-message-box.css'
import 'element-plus/lib/theme-chalk/el-message.css'
import { t2Chrome } from '../util/i18n/chrome/t'

const _alert = (message: string, type: MessageType) => ElMessage({ message, duration: 2000, type })

const success = (message: string) => _alert(message, 'success')

const error = (message: string) => _alert(message, 'error')

/**
 * Encrypt the plaintext and copy to the clipboard
 * 
 * @param plaintext  plaintext
 */
export function encryptAndMessage(plaintext: string) {
  cryptionExcutor.encrypt(plaintext)
    .then(
      txt => {
        copy(txt).then(() => {
          success(t2Chrome(msg => msg.message.encryptionSuccess))
        }).catch((e: any) => {
          console.log(e)
          error(t2Chrome(msg => msg.message.encryptionFail) + txt)
        })
      }
    )
}

/**
 * Try to decrypt the ciphertext and open modal
 * 
 * @param originText ciphertext
 * @param showError  whether to show error if the ciphertext is unknown
 * @return true if decrypted, or false
 */
export function decryptAndMessage(ciphertext: string, showError: boolean): Promise<boolean> {
  ciphertext = ciphertext.trimLeft()
  return cryptionExcutor.decrypt(ciphertext)
    .then(txt => {
      if (txt === ciphertext) {
        if (showError) {
          error(t2Chrome(msg => msg.message.unknownCipherText))
        }
        return Promise.resolve(false)
      } else {
        ElMessageBox({
          title: t2Chrome(msg => msg.message.decryptionResult),
          message: txt,
          type: 'success',
          showCancelButton: true,
          cancelButtonText: t2Chrome(msg => msg.button.cancel),
          confirmButtonText: t2Chrome(msg => msg.button.copy)
        }).then(() => {
          copy(txt)
            .then(() => success(t2Chrome(msg => msg.message.decryptionCopied)))
            .catch(() => error(t2Chrome(msg => msg.message.decryptionCopyFailed)))
        }).catch(() => { })
        return Promise.resolve(true)
      }
    })

}