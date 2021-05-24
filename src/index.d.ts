/**
 * Setting info
 */
declare interface ConfigInfo {
  password: string,
  autoFill: boolean
  /**
   * @since 1.1.0
   */
  autoDecrypt: boolean
  /**
   * @since 1.1.1
   */
  cipherVersion: number
}