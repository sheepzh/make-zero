import asyncStorage from '../chrome/common/async-storage';
import Initializable from "../chrome/interface/initializable";
import { DEFAULT_PASSWORD } from './default';

/**
 * Config for cryptor
 * 
 * @author zhy
 * @date 20201201
 */
class CryptorConfig implements Initializable {

  private static KEY: string = '__CryptorConfig__'

  /**
   * Default settings
   */
  private config: ConfigInfo = {
    password: DEFAULT_PASSWORD,
    autoFill: false,
    /**
     * @since 1.1.0
     */
    autoDecrypt: false,
    /**
     * @since 1.1.1
     */
    cipherVersion: 1
  }

  initialize(): void { this.changePassword(DEFAULT_PASSWORD) }

  public changePassword(psw: string): Promise<void> {
    this.config.password = psw
    return this.update()
  }

  public async getPassword(): Promise<string> {
    const config = await this.init();
    return await Promise.resolve(config.password);
  }

  public changeAutoFill(autoFill: boolean) {
    this.config.autoFill = autoFill
    this.update()
  }

  public async getAutoFill(): Promise<boolean> {
    const config = await this.init();
    return await Promise.resolve(config.autoFill);
  }

  /**
   * @since 1.4.0
   */
  public async getConfig(): Promise<ConfigInfo> {
    const config = await this.init();
    return await Promise.resolve(config);
  }

  /**
   * @since 1.1.0
   */
  public changeAutoDecrypt(autoDecrypt: boolean) {
    this.config.autoDecrypt = autoDecrypt
    this.update()
  }

  /**
   * @since 1.1.0
   */
  public async getAutoDecrypt(): Promise<boolean> {
    const config = await this.init();
    return await Promise.resolve(config.autoDecrypt);
  }

  /**
   * @since 1.1.1
   */
  public async getCipherVersion(): Promise<number> {
    const config = await this.init();
    return await Promise.resolve(config.cipherVersion);
  }

  /**
   * @since 1.1.1
   */
  public changeCipherVersion(version: number) {
    this.config.cipherVersion = version
    this.update()
    this.updateBadge()
  }

  private static INSTANCE: CryptorConfig

  private constructor() {
    this.init()
  }

  private async init(): Promise<ConfigInfo> {
    const config = await asyncStorage.getAsync<ConfigInfo>(CryptorConfig.KEY);
    if (config)
      this.config = config;
    this.updateBadge();
    return await Promise.resolve(this.config);
  }

  private update(): Promise<void> {
    return asyncStorage.setAsync<ConfigInfo>(CryptorConfig.KEY, this.config)
  }

  private updateBadge() {
    const version = this.config.cipherVersion

    chrome && chrome.browserAction
      && chrome.browserAction.setBadgeText
      && chrome.browserAction.setBadgeText({ text: version ? version + '' : '' })
  }

  public static getInstance(): CryptorConfig {
    if (CryptorConfig.INSTANCE == null) CryptorConfig.INSTANCE = new CryptorConfig()
    return CryptorConfig.INSTANCE
  }
}

export default CryptorConfig.getInstance()

