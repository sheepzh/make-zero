export default interface IMessageListener<T> {
    msgTag: string
    handleMessage(data: T, sender: chrome.runtime.MessageSender, sendResponse: Function): void
}