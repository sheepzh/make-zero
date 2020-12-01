
/**
 * The handler of tab update event
 * @see chrome.tabs.TabUpdatedEvent
 */
export default interface ITabUpdateHandler {
    handleTabUpdate(tabId: number, url: string, status: string, changeInfo: chrome.tabs.TabChangeInfo, tab: chrome.tabs.Tab): void
}