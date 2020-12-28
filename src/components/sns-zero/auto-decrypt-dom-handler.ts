import IDomCompleteHandler from "../../chrome/interface/i-dom-complete-hanler";
import cryptorConfig from "./cryptor-config";
import Cryptor from './cryptor';
import $ = require('jquery')

/**
 * Encrypt the <p> tags 
 * 
 * @author zhy
 * @since 1.1.0
 */
export default class AutoDecryptorDomHanlder implements IDomCompleteHandler {

  private cryptor: Cryptor = new Cryptor()

  support(host: string, href: string): boolean {
    return cryptorConfig.getAutoDecrypt()
  }
  handle(): void {
    const _cryptor = this.cryptor
    this.decript($("p"))
    this.decript($("pre"))
  }

  private decript(selector: JQuery) {
    const _cryptor = this.cryptor
    selector.filter((index, p) => _cryptor.support(p.innerText))
      .each((index, p) => { p.innerText = _cryptor.decrypt(p.innerText) })
  }
}