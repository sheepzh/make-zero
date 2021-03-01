/**
 * Reconstructed @since 1.3.0
 */
import cryptor from './cryptor'
import { write as copy } from 'clipboardy'
/**
 * Replace sweetalert2 with element-ui
 * @since 1.4.1 
 */
import { Message, MessageBox } from 'element-ui'
import { MessageType } from 'element-ui/types/message'
import 'element-ui/lib/theme-chalk/message-box.css'
import 'element-ui/lib/theme-chalk/message.css'

const _alert = (message: string, type: MessageType) => Message({ message, duration: 2000, type })

const success = (message: string) => _alert(message, 'success')

const error = (message: string) => _alert(message, 'error')
/**
 * Encrypt the plaintext and copy to the clipboard
 * 
 * @param plaintext  plaintext
 */
export function encryptAndMessage(plaintext: string) {
  const txt = cryptor.encrypt(plaintext)
  copy(txt).then(() => {
    success(chrome.i18n.getMessage("message_encryptionSuccess"))
  }).catch((e: any) => {
    console.log(e)
    error(chrome.i18n.getMessage("message_encryptionFail") + txt)
  })
}

/**
 * Try to decrypt the ciphertext and open modal
 * 
 * @param originText ciphertext
 * @param showError  whether to show error if the ciphertext is unknown
 * @return true if decrypted, or false
 */
export function decryptAndMessage(ciphertext: string, showError: boolean): boolean {
  ciphertext = ciphertext.trimLeft()
  const txt = cryptor.decrypt(ciphertext)
  if (txt === ciphertext) {
    if (showError) {
      error(chrome.i18n.getMessage("message_unknownCipherText"))
    }
    return false
  } else {
    MessageBox({
      title: chrome.i18n.getMessage('message_decryptionResult'),
      message: txt,
      type: 'success',
      showCancelButton: true,
      confirmButtonText: chrome.i18n.getMessage('button_copy')
    }).then(() => {
      copy(txt)
        .then(() => success(chrome.i18n.getMessage("message_decryptionCopied")))
        .catch(() => error(chrome.i18n.getMessage("message_decryptionCopyFailed")))
    }).catch(() => { })
    return true
  }
}