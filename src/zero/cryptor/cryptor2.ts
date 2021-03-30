import { ICryptor } from ".";
import Cryptor1 from "./cryptor1";
import Salt from "./salt";
import { password2Number, toUnicodeArray } from "./util";

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

  prefix(): string {
    return 'z02'
  }

  encript(plain: string, password: string): string {
    const charArr: Array<number> = toUnicodeArray(plain)

    let pn: number = password2Number(password)
    const salt: Salt = new Salt()
    salt.calcSalt(pn)
    pn = salt.getNewPn()

    const cipher = charArr.map(value => value ^ pn).map(c => String.fromCharCode(c)).join("")
    return salt.getPrefix() + cipher
  }

  decrypt(cipher: string, password: string): string {
    let pn: number = password2Number(password)

    const salt: Salt = new Salt()
    salt.parseSalt(pn, cipher)
    pn = salt.getNewPn()

    const charArr: Array<number> = toUnicodeArray(cipher.substring(1))

    return charArr.map(value => value ^ pn).map(c => String.fromCharCode(c)).join("")
  }
}
