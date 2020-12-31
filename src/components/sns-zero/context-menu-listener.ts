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

    handleMessage(enOrD: any, sender: chrome.runtime.MessageSender, sendResponse: Function): void {
        const selection = window.getSelection ?
            window.getSelection()
            : (document.getSelection ? document.getSelection() : (document.createRange() ? document.createRange().toString() : "")
            )
        const selectionText = selection.toString()

        if (enOrD) {
            const txt = cryptor.encrypt(selectionText)
            copy(txt).then(() => {
                _alert("密文已经复制到剪切板板！")
            }).catch((e: any) => {
                console.log(e)
                _alert("复制失败: " + txt)
            })
        } else {
            const txt = cryptor.decrypt(selectionText)
            if (txt === selectionText) {
                _alert('Sorry 啦，我不认识这个密文')
            } else {
                alert(txt)
                copy(txt)
            }
        }
        sendResponse("ok")
    }
}