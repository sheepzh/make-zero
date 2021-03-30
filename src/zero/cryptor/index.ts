import cryptorConfig from "../cryptor-config"
import Cryptor1 from './cryptor1'
import Cryptor2 from './cryptor2'

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
    this.latest = this.register(new Cryptor2())
  }

  private register(cryptor: ICryptor): ICryptor {
    this.cryptorMap.set(cryptor.version(), cryptor)
    this.cryptors.push(cryptor)
    return cryptor
  }

  version(): number {
    return this.latest.version()
  }

  encrypt(plain: string, callback: (ciphertext: string) => void): void {
    cryptorConfig.getCipherVersion(version => {
      const cryptor: ICryptor = version && this.cryptorMap.get(version) || this.latest
      cryptorConfig.getPassword((password: string) => {
        callback(cryptor.prefix() + cryptor.encript(plain, password))
      })
    })
  }

  decrypt(cipher: string, callback: (plaintext: string) => void): void {
    const cryptor: ICryptor = this.getCryptor(cipher)
    if (cryptor === null) {
      // return if not support
      callback(cipher)
    } else {
      const realCipher = cipher.substring(cryptor.prefix().length)
      cryptorConfig.getPassword((psw: string) => {
        const plaintext = cryptor.decrypt(realCipher, psw)
        callback(plaintext)
      })
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
      if (cipher.startsWith(c.prefix())) {
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

/**
 * abstract class of cryptor
 * 
 * @author zhy
 * @since 1.1.1
 */
export interface ICryptor {
  /**
   * The version of cryptor
   */
  version(): number

  /**
   * The prefix of ciphertext
   * 
   * @since 1.5.0
   */
  prefix(): string

  encript(plain: string, password: string): string

  decrypt(cipher: string, password: string): string
}

export default new CryptorComposite()

