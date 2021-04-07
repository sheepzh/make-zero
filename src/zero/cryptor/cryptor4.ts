import { ICryptor } from './i-cryptor'
import { maxUnicodeLength, password2Number, ringFromUnicodes, ringToUnicodes } from "./algorithm/string-process"

const PREFIX = '切噜～♪切卟咧'

const DICT = ['切', '卟', '叮', '咧', '哔', '唎', '啪', '啰', '啵', '嘭', '噜', '噼', '巴', '拉', '蹦', '玲']

const WORD_LEN_LEN = 1

/**
 * 
 * The 4th version of cryptor with Cheru 
 * 
 * @since 1.6.0
 */
export default class Cryptor4 implements ICryptor {
  support(cipher: string): boolean {
    if (!cipher.startsWith(PREFIX)) {
      return false
    }
    for (let i = PREFIX.length; i < cipher.length; i++) {
      const c = cipher.charAt(i)
      if (DICT.indexOf(c) < 0) {
        return false
      }
    }
    return true
  }
  version(): number {
    return 4
  }
  encript(plain: string, password: string): string {
    let pn = password2Number(password)
    const cipherUnicodes: number[] = ringToUnicodes(pn, plain)
    const unicodeLength: number = maxUnicodeLength(cipherUnicodes)
    return PREFIX + this.number2Cheru(unicodeLength, WORD_LEN_LEN) + cipherUnicodes.map(unicode => this.number2Cheru(unicode, unicodeLength)).join("")
  }

  decrypt(originCipher: string, password: string): string {
    if (originCipher.length < WORD_LEN_LEN + PREFIX.length) {
      return originCipher
    }
    let cipher = originCipher.substr(PREFIX.length)
    const lenthCheru = cipher.substring(0, 1)
    let length = this.cheru2Number(lenthCheru)
    if (length < 0) {
      return originCipher
    }
    if (length === 0) {
      length = 16
    }

    // The length of this word group
    const wordGroupLength = Math.ceil(length / 4)
    const unicodes: number[] = []
    for (let i = WORD_LEN_LEN; i + wordGroupLength <= cipher.length; i += wordGroupLength) {
      const unicode = this.cheru2Number(cipher.substr(i, wordGroupLength))
      if (unicode === -1) {
        return originCipher
      }
      unicodes.push(unicode)
    }
    const pn = password2Number(password)
    return ringFromUnicodes(pn, unicodes)
  }

  private number2Cheru(code: number, length: number) {
    const maxLength = Math.ceil(length / 4) * 4
    let leftShift = maxLength - 4
    let result = ''
    for (; leftShift >= 0; leftShift -= 4) {
      let mask = 15 << leftShift
      result += DICT[(code & mask) >>> leftShift]
    }
    return result
  }

  private cheru2Number(cheru: string) {
    let result = 0
    for (let i = 0; i < cheru.length; i++) {
      result <<= 4
      const char = cheru.charAt(i)
      let j = 0
      for (; j < DICT.length; j++) {
        if (char === DICT[j]) {
          result += j
          break
        }
      }
      if (j === DICT.length) {
        return -1
      }
    }
    return result
  }
}