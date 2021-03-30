import asyncStorage from '../chrome/common/async-storage';
import Initializable from "../chrome/interface/initializable";

export const DEFAULT_PASSWORD = '123456'
/**
 * Config for cryptor
 * 
 * @author zhy
 * @date 20201201
 */
class CryptorConfig implements Initializable {

    private static KEY: string = '__CryptorConfig__'

    private config: any = {
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

    public changePassword(psw: string, callback?: () => void) {
        this.config.password = psw
        this.update(callback)
    }

    public getPassword(callback: (psw: string) => void): void {
        this.init((config: any) => callback && callback(config.password))
    }

    public changeAutoFill(autoFill: boolean) {
        this.config.autoFill = autoFill
        this.update()
    }

    public getAutoFill(callback: (autoFill: boolean) => void): void {
        this.init((config: any) => callback && callback(!!config.autoFill))
    }

    /**
     * @since 1.4.0
     */
    public getConfig(callback: (config: any) => void): void {
        this.init((config: any) => callback && callback(!!config))
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
    public getAutoDecrypt(callback: (autoDecrypt: boolean) => void): void {
        this.init((config: any) => callback && callback(!!config.autoDecrypt))
        return this.config.autoDecrypt
    }

    /**
     * @since 1.1.1
     */
    public getCipherVersion(callback: (version: number) => void): void {
        this.init((config: any) => callback && callback(config.cipherVersion))
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

    private init(callback?: (config: any) => void) {
        asyncStorage.getAsync(CryptorConfig.KEY, (config: any) => {
            if (config) this.config = config
            callback && callback(this.config)
            this.updateBadge()
        })
    }

    private update(callback?: () => void) {
        asyncStorage.setAsync(CryptorConfig.KEY, this.config, callback)
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

