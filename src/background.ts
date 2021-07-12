import ITabUpdateHandler from './chrome/interface/i-tab-update-handler'

import IocBeans from './chrome/ioc'
import Initializable from './chrome/interface/initializable'
import Upgradable from './chrome/interface/upgradable'
import { MenuDefine } from './menu'

class Background {
    onTabUpdate(): void {
        chrome.tabs.onUpdated.addListener((tabId: number, changeInfo: chrome.tabs.TabChangeInfo, tab: chrome.tabs.Tab) => {
            IocBeans.tabUpdateHandlers.forEach(
                (handler: ITabUpdateHandler) => handler.handleTabUpdate(tabId, tab.url, changeInfo.status, changeInfo, tab)
            )
        })
    }
    onInstalled(): void {
        chrome.runtime.onInstalled.addListener((details: chrome.runtime.InstalledDetails) => {
            const reason: string = details.reason
            switch (reason) {
                case 'install':
                    IocBeans.initializables.forEach((bean: Initializable) => bean.initialize())
                    break
                case 'update':
                    IocBeans.upgradables.forEach((bean: Upgradable) => bean.upgrade(details.previousVersion))
                    break
            }
        })
    }
}

// entrance of the chrome app 

const bg: Background = new Background()

new MenuDefine().create()

bg.onTabUpdate()
bg.onInstalled()