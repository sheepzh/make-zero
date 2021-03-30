import { ICryptor } from '.'
import { password2Number, toUnicodeArray } from './util'

/**
 * The first cryptor
 * 
 * @since 1.0.0
 */
export default class Cryptor1 implements ICryptor {
  prefix(): string {
    return 'z01'
  }

  version(): number {
    return 1
  }

  encript(plain: string, password: string): string {
    return this.ring(plain, password)
  }

  decrypt(cipher: string, password: string): string {
    return this.ring(cipher, password)
  }

  /**
   * Ring with XOR
   * 
   * @param msg msg
   */
  private ring(msg: string, psw: string): string {
    const pn = password2Number(psw)
    return toUnicodeArray(msg).map(mn => mn ^ pn).map(cn => String.fromCharCode(cn)).join("")
  }
}