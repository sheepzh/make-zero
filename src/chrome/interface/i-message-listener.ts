export default interface IMessageListener {
    msgTag: string
    handleMessage(data: any, sender: chrome.runtime.MessageSender, sendResponse: Function): void
}