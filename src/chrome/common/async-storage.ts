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

  public getAsync<T>(key: string): Promise<T> {
    return new Promise(resolve => {
      this.storage.get(items => {
        const value = items[key]
        resolve(value as T)
      })
    })
  }

  public setAsync<T>(key: string, value: T): Promise<void> {
    const toSave = {}
    toSave[key] = value
    return new Promise(resolve => this.storage.set(toSave, resolve))
  }
}

export default AsyncStorage.getInstance()