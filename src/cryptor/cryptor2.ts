import { ICryptor } from './i-cryptor'
import Cryptor1 from "./cryptor1"
import { password2Number, ring } from "./algorithm/string-process"
/**
 * The second version of cryptor
 * 
 * New features:
 *  randomize the ciphertext
 * 
 * @author zhy
 * @since 1.1.1
 */
export default class Cryptor2 extends Cryptor1 implements ICryptor {

  version(): number {
    return 2
  }

  /**
   * @see Cryptor1
   * @override
   */
  prefix(): string {
    return 'z02'
  }

  encrypt(plain: string, password: string): string {
    let pn: number = password2Number(password)
    const salt: Salt = new Salt()
    salt.calcSalt(pn)
    pn = salt.getNewPn()

    const cipher = ring(pn, plain)
    return this.prefix() + String.fromCharCode(salt.getPrefixUnicode()) + cipher
  }

  decrypt(cipher: string, password: string): string {
    let pn: number = password2Number(password)

    const salt: Salt = new Salt()
    salt.parseSalt(pn, cipher.charCodeAt(this.prefix().length))
    pn = salt.getNewPn()

    return ring(pn, cipher.substring(this.prefix().length + 1))
  }
}


/**
 * Salt for ramdon cipher
 * 
 * @since 1.1.1
 */
class Salt {
  private static ZERO_BASE = 0x4e00
  private static MASK_SEGMENT = [7, 15, 31, 63, 127, 255]
  private static ZH_LENGTH = 1 << 10 // = 1024

  mask: number
  salt: number
  pn: number

  /**
   * Generate salt
   * 
   * @param pn 
   */
  calcSalt(pn: number): void {
    this.pn = pn
    this.calcMask()
    while (!this.isValid()) {
      this.circle()
    }
  }

  parseSalt(pn: number, cipherSaltCode: number) {
    this.pn = pn
    this.calcMask()
    this.salt = (cipherSaltCode - Salt.ZERO_BASE) * (this.mask + 1) / Salt.ZH_LENGTH
  }

  private isValid(): boolean {
    return !!this.getNewPn()  // newPn != 0      
  }

  private circle() {
    this.salt = new Date().getTime() & this.mask
  }

  private calcMask() {
    let mask: number
    for (let i = 0; i < Salt.MASK_SEGMENT.length; i++) {
      mask = Salt.MASK_SEGMENT[i]
      if (this.pn < mask) {
        this.mask = mask
        break
      }
    }
    this.mask = mask
  }

  getNewPn(): number {
    return this.pn + this.salt
  }

  getPrefixUnicode(): number {
    return (this.salt * Salt.ZH_LENGTH / (this.mask + 1)) + Salt.ZERO_BASE
  }
}
