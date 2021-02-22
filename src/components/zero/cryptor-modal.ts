/**
 * Reconstructed @since 1.3.0
 */

import cryptor from './cryptor'
import copy = require('clipboard-copy')
import sweetAlert from 'sweetalert2'

const _alert = (text: string) => sweetAlert.fire({
  text,
  toast: true,
  timer: 2000,
  position: 'center',
  showConfirmButton: false
})

const alert = (text: string) => sweetAlert.fire({
  text,
  position: "center"
})

/**
 * Encrypt the plaintext and copy to the clipboard
 * 
 * @param plaintext  plaintext
 */
export function encryptAndMessage(plaintext: string) {
  const txt = cryptor.encrypt(plaintext)
  copy(txt).then(() => {
    _alert(chrome.i18n.getMessage("message_encryptionSuccess"))
  }).catch((e: any) => {
    console.log(e)
    _alert(chrome.i18n.getMessage("message_encryptionFail") + txt)
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
      _alert(chrome.i18n.getMessage("message_unknownCipherText"))
    }
    return false
  } else {
    alert(txt)
    copy(txt)
    return true
  }
}