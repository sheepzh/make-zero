import { ICryptor } from "."

/**
 * Cryptor with variable-lengthed unicodes in ciphertext
 * 
 * @since 1.6.0
 */
export default abstract class VariableLengthCryptor implements ICryptor {

  abstract prefix(): string

  abstract support(cipher: string): boolean

  abstract version(): number

  encript(plain: string, password: string): string {
    throw new Error("Method not implemented.")
  }

  decrypt(cipher: string, password: string): string {
    throw new Error("Method not implemented.")
  }
}