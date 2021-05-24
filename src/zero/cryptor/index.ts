import cryptorConfig from "../cryptor-config"
import Cryptor1 from './cryptor1'
import Cryptor2 from './cryptor2'
import Cryptor3 from "./cryptor3"
import Cryptor4 from "./cryptor4"
import { ICryptor } from "./i-cryptor"

/**
 * The set of cryptors with different version
 * 
 * @author zhy
 * @since 1.1.1
 */
class CryptorComposite {
  private cryptorMap: Map<number, ICryptor> = new Map<number, ICryptor>()
  private cryptors: ICryptor[] = []
  private latest: ICryptor

  constructor() {
    this.register(new Cryptor1())
    this.register(new Cryptor2())
    this.register(new Cryptor3())
    this.latest = this.register(new Cryptor4())
  }

  private register(cryptor: ICryptor): ICryptor {
    this.cryptorMap.set(cryptor.version(), cryptor)
    this.cryptors.push(cryptor)
    return cryptor
  }

  version(): number {
    return this.latest.version()
  }

  encrypt(plain: string): Promise<string> {
    return cryptorConfig.getCipherVersion()
      .then(version => {
        const cryptor: ICryptor = version && this.cryptorMap.get(version) || this.latest
        return cryptorConfig.getPassword()
          .then((password: string) => Promise.resolve(cryptor.encript(plain, password)))
      })
  }

  decrypt(cipher: string): Promise<string> {
    const cryptor: ICryptor = this.getCryptor(cipher)
    if (cryptor === null) {
      // return if not support
      return Promise.resolve(cipher)
    } else {
      return cryptorConfig
        .getPassword()
        .then((psw: string) => Promise.resolve(cryptor.decrypt(cipher, psw)))
    }
  }

  /**
   * @param cipher cipher 
   * @returns true if any criptor can decript this cipher
   */
  public support(cipher: string): boolean {
    return this.getCryptor(cipher) !== null
  }

  private getCryptor(cipher: string): ICryptor {
    cipher = this.preprocess(cipher)
    let cryptor: ICryptor = null
    this.cryptors.forEach(c => {
      if (c.support(cipher)) {
        cryptor = c
      }
    })

    return cryptor
  }

  /**
   * Remove blank signs before ciphertext
   */
  private preprocess(cipher: string): string {
    if (cipher === undefined) {
      return ''
    }
    while (cipher.length && cipher.startsWith('\t') || cipher.startsWith('\n') || cipher.startsWith('\r') || cipher.startsWith(' ')) {
      cipher = cipher.substring(1)
    }
    return cipher
  }
}

export default new CryptorComposite()