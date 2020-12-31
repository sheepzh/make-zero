import { ICryptor } from ".";

/**
 * The first cryptor
 * 
 * @since 1.0.0
 */
export default class Cryptor1 implements ICryptor {
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
    const pn = this.getPasswordNumber(psw)
    return this.toUnicodeArray(msg).map(mn => mn ^ pn).map(cn => String.fromCharCode(cn)).join("")
  }

  /**
   * Translate the password 2 number
   */
  protected getPasswordNumber(psw: string): number {
    let pn: number = 0
    this.toUnicodeArray(psw).forEach(n => pn ^= n)
    return pn
  }

  protected toUnicodeArray(str: string): Array<number> {
    const result: Array<number> = []
    for (let i = 0; i < str.length; i++) {
      result.push(str.charCodeAt(i))
    }
    return result
  }
}