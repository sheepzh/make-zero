
/**
 * Salt for ramdon cipher
 * 
 * @since 1.1.1
 */
export default class Salt {
  private static ZERO_BASE = 0x4e00
  private static MASK_SEGMENT = [7, 15, 31, 63, 127, 255]
  private static ZH_LENGTH = 1 << 10 // = 1024

  mask: number
  salt: number
  pn: number

  calcSalt(pn: number) {
    this.pn = pn
    this.calcMask()
    while (!this.isValid()) {
      this.circle(pn)
    }
  }

  parseSalt(pn: number, cipher: string) {
    this.pn = pn
    this.calcMask()
    this.salt = (cipher.charCodeAt(0) - Salt.ZERO_BASE) * (this.mask + 1) / Salt.ZH_LENGTH
  }

  private isValid(): boolean {
    return !!this.getNewPn()  // newPn != 0      
  }

  private circle(pn: number) {
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

  getPrefix(): string {
    return String.fromCharCode((this.salt * Salt.ZH_LENGTH / (this.mask + 1)) + Salt.ZERO_BASE)
  }
}