import IMessageListener from './chrome/interface/i-message-listener'
import ContextMenuListener from './zero/context-menu-listener'

const listeners: IMessageListener<unknown>[] = []

listeners.push(new ContextMenuListener())

chrome.runtime.onMessage.addListener(function (obj, sender, sendResponse) {
    listeners.filter(listener => listener.msgTag === obj.tag).forEach(
        listener => {
            try {
                listener.handleMessage(obj.data, sender, sendResponse)
            } catch (e) {
                console.error('Failed to consume message tag with ' + obj.tag)
                console.error(listener)
                console.error(e)
            }
        }
    )
})