import IDomCompleteHandler from "../../../chrome/interface/i-dom-complete-hanler";
import cryptorConfig from "../cryptor-config";
import AbstractAutoDecryptor from "./abstract-auto-decryptor";
import DefaultDecryptor from "./default-decryptor";
import WeiboDecryptor from './weibo-decryptor'

export default class AutoDecryptorComposite implements IDomCompleteHandler {
  private host: string
  private composites: AbstractAutoDecryptor[]

  public constructor() {
    this.composites = []

    this.composites.push(new WeiboDecryptor())
    this.composites.push(new DefaultDecryptor())
  }

  support(host: string, href: string): boolean {
    this.host = host
    return host !== "wx2.qq.com" && cryptorConfig.getAutoDecrypt()
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