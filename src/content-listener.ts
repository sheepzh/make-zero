import IMessageListener from './chrome/interface/i-message-listener'
import engineComposite from './components/engine/engine-composite'

const listeners: IMessageListener[] = []

engineComposite.forEach((listener: IMessageListener) => listeners.push(listener))

chrome.runtime.onMessage.addListener(function (obj, sender, sendResponse) {
    listeners.filter(listener => listener.msgTag === obj.tag).forEach(
        listener => {
            try {
                listener.handleMessage(obj.data, sender, sendResponse)
            } catch {
                console.error('Failed to consume message tag with ' + obj.tag)
                console.error(listener)
            }
        }
    )
})