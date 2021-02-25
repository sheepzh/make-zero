import IDomCompleteHandler from "../../../chrome/interface/i-dom-complete-hanler";
import AbstractDomDecryptor from "./abstract-dom-decryptor";
import DefaultDecryptor from "./default-decryptor";
import WeiboDecryptor from './weibo-decryptor'

/**
 * Mark the ciphertext element with attr. 
 * 
 * @since 1.4.0
 */
export const CIPHER_ATTR_NAME = 'make-zero-ciphertext'

/**
 * Show the float button while the user moves its mouse on <p> tags within ciphertexts
 * @author zhy
 */
export default class DomDecryptorComposite implements IDomCompleteHandler {
  private host: string
  private composites: AbstractDomDecryptor[]
  public constructor() {
    this.composites = []

    this.composites.push(new WeiboDecryptor())
    this.composites.push(new DefaultDecryptor())
  }

  support(host: string, href: string): boolean {
    this.host = host
    return host !== "wx2.qq.com"
  }

  handle(): void {
    for (const decryptor of this.composites) {
      if (decryptor.support(this.host)) {
        decryptor.handle()
        return
      }
    }
  }
}