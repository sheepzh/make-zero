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
  private latest: ICryptor

  constructor() {
    this.register(new Cryptor1())
    this.latest = this.register(new Cryptor2())
    console.log(this.cryptorMap)
  }

  private register(cryptor: ICryptor): ICryptor {
    this.cryptorMap.set(cryptor.version(), cryptor)
    return cryptor
  }

  version(): number {
    return this.latest.version()
  }

  encrypt(plain: string): string {
    return this.prefix(this.latest) + this.latest.encript(plain, cryptorConfig.getPassword())
  }

  decrypt(cipher: string): string {
    const ICryptor: ICryptor = this.getCryptor(cipher)
    if (ICryptor === null) {
      // return if not support
      return cipher
    }
    return ICryptor.decrypt(cipher.substring(3), cryptorConfig.getPassword())
  }

  private prefix(ICryptor: ICryptor) {
    const version: number = ICryptor.version()
    if (version < 10) {
      return 'z0' + version
    } else {
      return 'z' + version
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
    if (cipher.length < 3 || !cipher.startsWith('z')) {
      return null
    }
    const versionStr = cipher.substring(1, 3)
    try {
      const version: number = Number.parseInt(versionStr)
      const cryptor: ICryptor = this.cryptorMap.get(version)
      return cryptor
    } catch (e) {
      return null
    }
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
 * abstract class of   ICryptor
 * 
 * @author zhy
 * @since 1.1.1
 */
export interface ICryptor {
  /**
   * The version of   ICryptor
   */
  version(): number

  encript(plain: string, password: string): string

  decrypt(cipher: string, password: string): string
}

export default new CryptorComposite()