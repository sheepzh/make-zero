import { ICryptor } from "."

/**
 * 
 * The second version of cryptor with morse code
 * 
 * @since 1.5.0
 */
export default class Cryptor3 implements ICryptor {
  version(): number {
    return 3
  }
  prefix(): string {
    return 'z03'
  }
  encript(plain: string, password: string): string {
    throw new Error("Method not implemented.")
  }
  decrypt(cipher: string, password: string): string {
    throw new Error("Method not implemented.")
  }
}