import IMessageListener from '../../chrome/interface/i-message-listener'
import cryptor from './cryptor'
import copy = require('clipboard-copy')
import sweetAlert from 'sweetalert2'
const _alert = (text: string) => sweetAlert.fire({
    text,
    toast: true,
    timer: 2000,
    position: 'center',
    showConfirmButton: false
})

const alert = (text: string) => sweetAlert.fire({
    text,
    position: "center"
})

export default class ContextMenuListener implements IMessageListener {
    msgTag: string = 'encrypt'

    private getSelection(): string {
        const selection = window.getSelection ?
            window.getSelection()
            : (document.getSelection ? document.getSelection() : (document.createRange() ? document.createRange().toString() : "")
            )
        let selectionText = selection.toString()
        // @2020/01/04 v1.1.2, fix the text in the iframes cant be encrypted/decrypted 
        const iframe = document.getElementsByTagName('iframe')
        for (let index = 0; index < iframe.length && !selectionText; index++) {
            selectionText = iframe[index].contentWindow.getSelection().toString()
        }
        return selectionText
    }

    handleMessage(enOrD: any, sender: chrome.runtime.MessageSender, sendResponse: Function): void {
        const selectionText = this.getSelection()

        if (enOrD) {
            const txt = cryptor.encrypt(selectionText)
            copy(txt).then(() => {
                _alert(chrome.i18n.getMessage("message_encryptionSuccess"))
            }).catch((e: any) => {
                console.log(e)
                _alert(chrome.i18n.getMessage("message_encryptionFail") + txt)
            })
        } else {
            const txt = cryptor.decrypt(selectionText)
            if (txt === selectionText) {
                _alert(chrome.i18n.getMessage("message_unknownCipherText"))
            } else {
                alert(txt)
                copy(txt)
            }
        }
        sendResponse("ok")
    }
}