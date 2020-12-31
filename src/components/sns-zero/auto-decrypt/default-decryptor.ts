import { AutoDecryptor } from ".";
import cryptor from "../cryptor";
import $ = require('jquery')

export default class DefaultDecryptor implements AutoDecryptor {

  support(host: string): boolean {
    return true
  }
  handle(): void {
    this.decript($("p"))
    this.decript($("pre"))
    this.decript($('span'))
  }

  private decript(selector: JQuery) {
    selector
      .filter((index, p) => cryptor.support(p.innerText))
      .each((index, p) => { p.innerText = cryptor.decrypt(p.innerText) })
  }
}