import IMessageListener from '../chrome/interface/i-message-listener'
import { encryptAndMessage, decryptAndMessage } from './cryptor-modal'
import { getSelectionText } from './common/util'

export default class ContextMenuListener implements IMessageListener {
    msgTag: string = 'encrypt'

    handleMessage(enOrD: any, sender: chrome.runtime.MessageSender, sendResponse: Function): void {
        const selectionText = getSelectionText()
        if (enOrD) {
            encryptAndMessage(selectionText)
        } else {
            decryptAndMessage(selectionText, true)
        }
        sendResponse("ok")
    }
}