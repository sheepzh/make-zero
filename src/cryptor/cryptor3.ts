import { ICryptor } from './i-cryptor'
import { maxUnicodeLength, password2Number, ringFromUnicodes, ringToUnicodes } from "./algorithm/string-process"

const WORD_LEN_LEN = 4
const PREFIX = '-'

const ONE = '-'
const ZERO = '·'

/**
 * 
 * The third version of cryptor with morse code
 * 
 * Format:
 * 4-digits-max-word-length + cipher
 * 
 * @since 1.5.0
 */
export default class Cryptor3 implements ICryptor {
  support(cipher: string): boolean {
    if (!cipher.startsWith(PREFIX)) {
      return false
    }
    // #2 Wrong detection result of '-'
    if (cipher.length < (PREFIX.length + WORD_LEN_LEN)) {
      return false
    }
    for (let i = 0; i < cipher.length; i++) {
      const c = cipher.charAt(i)
      if (c != ZERO && c != ONE) {
        return false
      }
    }
    return true
  }

  version(): number {
    return 3
  }

  encrypt(plain: string, password: string): string {
    let pn = password2Number(password)
    const cipherUnicodes: number[] = ringToUnicodes(pn, plain)
    const unicodeLength: number = maxUnicodeLength(cipherUnicodes)
    return PREFIX + this.number2MorseCode(unicodeLength, WORD_LEN_LEN) + cipherUnicodes.map(unicode => this.number2MorseCode(unicode, unicodeLength)).join("")
  }

  decrypt(originCipher: string, password: string): string {
    if (originCipher.length < WORD_LEN_LEN + PREFIX.length) {
      return originCipher
    }
    let cipher = originCipher.substr(PREFIX.length)
    const lenthMorse = cipher.substring(0, WORD_LEN_LEN)
    let length = this.morse2Number(lenthMorse)
    if (length < 0) {
      return originCipher
    }
    if (length === 0) {
      length = 16
    }
    const unicodes: number[] = []
    let cipherUnit: string
    for (let i = WORD_LEN_LEN; i < cipher.length; i += length) {
      cipherUnit = cipher.substr(i, length)
      // Ignore the tail part unit
      if (cipherUnit.length < length) {
        break
      }
      const unicode = this.morse2Number(cipherUnit)
      if (unicode === -1) {
        return originCipher
      }
      unicodes.push(unicode)
    }
    const pn = password2Number(password)
    if (!unicodes.length) {
      return originCipher
    }
    return ringFromUnicodes(pn, unicodes)
  }

  /**
    * Translate unicode 2 morse code
    * 
    * @param code unicode
    * @returns the length of morse code
    */
  private number2MorseCode(code: number, length: number) {
    let result = ''
    for (let mask = 1 << (length - 1); mask > 0; mask >>= 1) {
      result += (code & mask) ? '-' : '·'
    }
    return result
  }

  private morse2Number(morse: string) {
    let result = 0
    for (let i = 0; i < morse.length; i++) {
      result <<= 1
      const char = morse.charAt(i)
      if (char === '-') {
        result += 1
      } else if (char !== '·') {
        return -1
      }
    }
    return result
  }
}