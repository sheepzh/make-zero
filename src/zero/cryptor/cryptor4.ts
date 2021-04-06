import { ICryptor } from "."

const PREFIX = '切噜～♪切卟咧'

/**
 * 
 * The 4th version of cryptor with Cheru 
 * 
 * What's is Cherus?
 * @see 
 * 
 * Format:
 *  4-digits-max-word-length + cipher
 * 
 * @since 1.6.0
 */
export default class Cryptor4 implements ICryptor {
  support(cipher: string): boolean {
    throw new Error("Method not implemented.");
  }
  version(): number {
    throw new Error("Method not implemented.");
  }
  encript(plain: string, password: string): string {
    throw new Error("Method not implemented.");
  }
  decrypt(cipher: string, password: string): string {
    throw new Error("Method not implemented.");
  }
}