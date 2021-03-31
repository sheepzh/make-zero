import { ICryptor } from "."
import { password2Number, ringFromUnicodes, ringToUnicodes } from "./algorithm/string-process"

const WORD_LEN_LEN = 4
const PREFIX = '-'

const ONE = '-'
const ZERO = '·'

/**
 * 
 * The second version of cryptor with morse code
 * 
 * Format:
 * 4-digits-max-word-length + cipher
 * 
 * @since 1.5.0
 */
export default class Cryptor3 implements ICryptor {
  support(cipher: string): boolean {
    if (!cipher.startsWith('-')) {
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

  encript(plain: string, password: string): string {
    let pn = password2Number(password)

    const cipherUnicodes: number[] = ringToUnicodes(pn, plain)

    const unicodeLength: number = this.maxUnicodeLength(cipherUnicodes)

    return PREFIX + this.number2MorseCode(unicodeLength, WORD_LEN_LEN) + cipherUnicodes.map(unicode => this.number2MorseCode(unicode, unicodeLength)).join("")
  }

  decrypt(cipher: string, password: string): string {
    if (cipher.length < WORD_LEN_LEN + 1) {
      return cipher
    }
    cipher = cipher.substr(1)
    const lenthMorse = cipher.substring(0, 4)
    let length = this.morse2Number(lenthMorse)
    if (length < 0) {
      return cipher
    }
    if (length === 0) {
      length = 16
    }
    const unicodes: number[] = []
    for (let i = WORD_LEN_LEN; i + length <= cipher.length; i += length) {
      const unicode = this.morse2Number(cipher.substr(i, length))
      if (unicode === -1) {
        return cipher
      }
      unicodes.push(unicode)
    }
    const pn = password2Number(password)
    return ringFromUnicodes(pn, unicodes)
  }

  /**
    * Translate unicode 2 morse code
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

  private maxUnicodeLength(cipherUnicodes: number[]) {
    let length = 1
    let max = 1
    cipherUnicodes.forEach(unicode => {
      while (max < unicode) {
        max <<= 1
        max += 1
        length++
      }
    })
    return length
  }
}