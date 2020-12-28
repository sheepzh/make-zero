import IMessageListener from '../../chrome/interface/i-message-listener'
import Encryptor from './cryptor'
import copy = require('clipboard-copy')
import sweetAlert from 'sweetalert2'
const _alert = (text: string) => sweetAlert.fire({
    text,
    toast: true,
    timer: 2000,
    position: 'top',
    showConfirmButton: false
})

const alert = (text: string) => sweetAlert.fire({
    text,
    position: 'top'
})

export default class ContextMenuListener implements IMessageListener {
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
                _alert("密文已经复制到剪切板板！")
            }).catch((e: any) => {
                console.log(e)
                _alert("复制失败: " + txt)
            })
        } else {
            const txt = this.encryptor.decrypt(selectionText)
            if (txt === selectionText) {
                _alert('Sorry 啦，不认识这个密文')
            } else {
                alert(txt)
                copy(txt)
            }
        }
        sendResponse("ok")
    }
}