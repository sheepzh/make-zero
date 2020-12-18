import IMessageListener from '../../chrome/interface/i-message-listener'
import Encryptor from '../sns-zero/cryptor'

const _alert = (str: string) => require("show-toast")({
    str,
    time: 2000,
    position: 'top'
})

import copy = require('clipboard-copy')

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
            copy(txt).then(() => {
                _alert("Copied the ciphertext!")
            }).catch((e: any) => {
                console.log(e)
                alert("Failed to copy: " + txt)
            })
        } else {
            const txt = this.encryptor.decrypt(selectionText)
            if (txt === selectionText) {
                _alert('Ciphertext not recognized!')
            } else {
                alert(txt)
                copy(txt)
            }
        }
        sendResponse("ok")
    }
}