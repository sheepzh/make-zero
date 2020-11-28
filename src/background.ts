import ITabUpdateHandler from './chrome/interface/i-tab-update-handler'
import { EngineComposite } from './components/engine/abstract-engine'

// chrome.runtime.onInstalled.addListener(() => {
//     // new Filter().upgrade()
//     // Switch.upgrade()
//     // Encryptor.onInstalled()
// })

class Background {
    onTabUpdate(): void {
        chrome.tabs.onUpdated.addListener((tabId: number, changeInfo: chrome.tabs.TabChangeInfo, tab: chrome.tabs.Tab) => {
            EngineComposite.forEach((handler: ITabUpdateHandler) => handler.handleTabUpdate(tabId, tab.url, changeInfo.status, changeInfo, tab))
        })
    }
}

const bg: Background = new Background()

bg.onTabUpdate()