/**
 * App service
 */
import cryptorConfig from "../config"
import cryptorComposite from "../cryptor"

export class CryptionExcutor {
  public support(cipher: string): boolean {
    return cryptorComposite.support(cipher)
  }

  public async encrypt(plain: string): Promise<string> {
    const version = await cryptorConfig.getCipherVersion()
    const password = await cryptorConfig.getPassword()
    return await Promise.resolve(cryptorComposite.encrypt(plain, version, password))
  }

  public async decrypt(cipher: string): Promise<string> {
    const version = await cryptorConfig.getCipherVersion()
    const password = await cryptorConfig.getPassword()
    return await Promise.resolve(cryptorComposite.decrypt(cipher, version, password))
  }
}

export default new CryptionExcutor()