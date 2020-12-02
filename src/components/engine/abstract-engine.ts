import IMessageListener from '../../chrome/interface/i-message-listener'
import ITabUpdateHandler from '../../chrome/interface/i-tab-update-handler'
import AbstractEngineTailer from './abstract-engine-tailer'
import badWordDictionary from './bad-word-dictionary'
import switcher from './switcher'
import tabAndKeyword from './tab-and-keyword'

/**
 * Abstract engine
 * @author zhy
 * @date 20201129
 */
export default abstract class AbstractEngine implements ITabUpdateHandler, IMessageListener {
    msgTag = 'ENGINE_FILTER' // implemention of IMessageListener

    abstract key: string
    abstract name: string
    abstract prefix: String // the prefix of url to filter
    abstract tailer: AbstractEngineTailer

    /**
     * Change the url with bad keywords
     * @param url  origin url
     * @param badWords bad keywords
     */
    abstract changeUrl(url: string, badWords: string[]): UrlChanged

    public handleTabUpdate(tabId: number, url: string, status: string): void {
        switcher.on(this.key, (isOn: boolean) => {
            if (!isOn) return
            if (!this.isEngine(url)) return // not one search engine

            if (status === 'loading') {
                const allBadWords: string[] = badWordDictionary.allWords() // get the needAppendchangeUrl
                if (!allBadWords || !allBadWords.length) return

                const urlChanged: UrlChanged = this.changeUrl(url, allBadWords)

                const { newUrl, needRedirect, originParam } = urlChanged

                // change the tab url
                if (needRedirect) {
                    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
                        !tabAndKeyword.storeWords(tabId, originParam)
                            && chrome.tabs.update(tabId, { url: newUrl }, () => { })
                    })
                }
            } else if (status === 'complete') {
                const originParam: string = tabAndKeyword.get(tabId)
                if (!!originParam) {
                    tabAndKeyword.delete(tabId)
                    chrome.tabs.sendMessage(tabId, { tag: this.msgTag, data: originParam }, res => console.log(res))
                }
            }

        })
    }

    /**
     * @param url origin url
     */
    private isEngine(url: string): boolean { return url.indexOf('https://' + this.prefix) > -1 || url.indexOf('http://' + this.prefix) > -1 }

    public handleMessage(data: any, sender: chrome.runtime.MessageSender, sendResponse: Function): void {
        let words = decodeURI(data)
        this.tailer.tail(words)
        sendResponse(`the engine[${this.key}] seen`)
    }

    /**
     * Switch the searcher of filter
     * 
     * @param onOrOff true means on, or off
     */
    public switch(onOrOff: boolean): void {
        switcher.set(this.key, onOrOff)
    }

    protected constructor() {
        // must be singleton
    }
}

/**
 * The result to change the origin url
 */
export class UrlChanged {
    newUrl: string
    needRedirect: boolean
    originParam: string
}