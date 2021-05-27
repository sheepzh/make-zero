
/**
 * Interface of cryptor. 
 * Reconstructed @since 1.6.0 
 * 
 * @author zhy
 * @since 1.1.1
 */
export interface ICryptor {

  /**
   * Whether support the cipher 
   * 
   * @param cipher v1.5.1
   */
  support(cipher: string): boolean

  /**
   * The version of cryptor
   */
  version(): number

  encrypt(plain: string, password: string): string

  decrypt(cipher: string, password: string): string
}