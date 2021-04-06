import { ICryptor } from '.'
import { password2Number, ring } from './algorithm/string-process'

/**
 * The first cryptor
 * 
 * @since 1.0.0
 */
export default class Cryptor1 implements ICryptor {
  support(cipher: string): boolean {
    return cipher.startsWith(this.prefix())
  }

  /**
   * The prefix of cipher
   */
  prefix() {
    return 'z01'
  }

  version(): number {
    return 1
  }

  encript(plain: string, password: string): string {
    return this.prefix() + this.ring(plain, password)
  }

  decrypt(cipher: string, password: string): string {
    return this.ring(cipher.substr(this.prefix().length), password)
  }

  private ring(msg: string, psw: string): string {
    const pn = password2Number(psw)
    return ring(pn, msg)
  }
}