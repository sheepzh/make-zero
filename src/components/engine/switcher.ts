import asyncStorage from '../../chrome/common/async-storage'

/**
 * Switch keeper
 * @author zhy
 * @date 2020/11/28
 */
class Switcher {
    private static INSTANCE: Switcher

    private static KEY = '__engine_switch__'

    private switchDict: { [key: string]: boolean; }

    private constructor() {
        asyncStorage.getAsync(Switcher.KEY, (data: any) => this.switchDict = data || {})
    }

    static getInstance(): Switcher {
        if (!Switcher.INSTANCE) Switcher.INSTANCE = new Switcher()
        return Switcher.INSTANCE
    }

    /**
     * Set the switch
     * @param key Key of switch
     * @param onOrOff true is on, or off
     */
    public set(key: string, onOrOff: boolean) {
        this.switchDict[key] = onOrOff
        this.save()
    }

    /**
     * @param key Key of switch
     */
    public on(key: string): boolean {
        return this.switchDict[key]
    }

    private save(): void {
        asyncStorage.setAsync(Switcher.KEY, this.switchDict)
    }
}

export default Switcher.getInstance()