/**
 * Storage implements the storage of the chrome
 * 
 * @author zhy
 * @date 2020/11/28
 */
class AsyncStorage {
    private static instance: AsyncStorage

    private storage = chrome.storage.local

    static getInstance(): AsyncStorage {
        if (!AsyncStorage.instance) AsyncStorage.instance = new AsyncStorage()
        return AsyncStorage.instance
    }

    public getAsync(key: string, callback: Function): void {
        this.storage.get(items => {
            const value = items[key]
            callback && callback(value)
        })
    }

    public setAsync<T>(key: string, value: T, callback?: () => void) {
        const toSave = {}
        toSave[key] = value
        this.storage.set(toSave, () => callback && callback())
    }
}

export default AsyncStorage.getInstance()