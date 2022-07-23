import IMessageListener from '../chrome/interface/i-message-listener'
import { encryptAndMessage, decryptAndMessage } from './cryptor-modal'
import { getSelectionText } from './common/util'
import clipboardy from 'clipboardy'


type TextOrigin = 'clipboard' | 'selection'

export type ContextMenuMessageInfo = {
    enOrD: 'encrypt' | 'decrypt'
    origin: TextOrigin
}

async function getOriginText(origin: TextOrigin): Promise<string> {
    if (origin === 'clipboard') {
        const clipboardContent = clipboardy.readSync()
        return clipboardContent || ''
    } else {
        return getSelectionText()
    }
}

export default class ContextMenuListener implements IMessageListener<ContextMenuMessageInfo> {
    msgTag: string = 'encrypt'

    async handleMessage(data: ContextMenuMessageInfo, _sender: chrome.runtime.MessageSender, sendResponse: Function): Promise<void> {
        const { enOrD, origin } = data
        const text = await getOriginText(origin)
        if (enOrD === 'encrypt') {
            encryptAndMessage(text, origin === 'clipboard')
        } else {
            decryptAndMessage(text, true)
        }
        sendResponse("ok")
    }
}