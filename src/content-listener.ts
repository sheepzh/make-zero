import IMessageListener from './chrome/interface/i-message-listener'
import engineComposite from './components/engine/engine-composite'
import ContextMenuListener from './components/sns-zero/context-menu-listener'

const listeners: IMessageListener[] = []

engineComposite.forEach((listener: IMessageListener) => listeners.push(listener))
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