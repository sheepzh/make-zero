import IDomCompleteHandler from "../../chrome/interface/i-dom-complete-hanler"
import { encryptAndMessage, decryptAndMessage } from "./cryptor-modal"
import { getSelectionText } from '../common/util'

/**
 * Encrypt the plaintext by Ctrl + Q
 * 
 * @author zhy
 * @since 1.3.0
 */
export default class ShortcutCryptor implements IDomCompleteHandler {
  support(host: string, href: string): boolean {
    return host !== "wx2.qq.com"
  }
  handle(): void {
    let existingOnkeydown = document.onkeydown
    document.onkeydown = function (ev: KeyboardEvent) {
      existingOnkeydown && existingOnkeydown.call(this, ev)
      if (ev.defaultPrevented) {
        return
      }
      if (ev.ctrlKey && ev.key === ",") {
        const selectionText = getSelectionText()
        // Try to decrypt first.
        // If failed, then encrypt the selection text
        decryptAndMessage(selectionText, false) || encryptAndMessage(selectionText)
      }
    }
  }
}