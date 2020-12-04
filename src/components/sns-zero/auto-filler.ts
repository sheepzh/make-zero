import IMessageListener from '../../chrome/interface/i-message-listener'
import Encryptor from '../sns-zero/cryptor'

export class AutoFiller implements IMessageListener {
    msgTag: string = 'encrypt'

    encryptor: Encryptor = new Encryptor()

    handleMessage(enOrD: any, sender: chrome.runtime.MessageSender, sendResponse: Function): void {
        const selection = window.getSelection ?
            window.getSelection()
            : (document.getSelection ? document.getSelection() : (document.createRange() ? document.createRange().toString() : "")
            )
        const selectionText = selection.toString()

        if (enOrD) {
            const txt = this.encryptor.encrypt(selectionText)
            // copyText(txt)
            alert(txt)
        } else {
            alert(this.encryptor.decrypt(selectionText))
        }
        sendResponse("ok")
    }
}