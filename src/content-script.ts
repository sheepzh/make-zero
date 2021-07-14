import IDomCompleteHandler from "./chrome/interface/i-dom-complete-handler"
import ContentEditablePasteHandler from "./zero/common/content-editable-paste-handler"
import AutoCryptorDomHandler from './zero/auto-cryptor-dom-handler'
import AutoDecryptorComposite from "./zero/auto-decrypt"
import DomDecryptorComposite from './zero/dbclick'
import ShortcutCryptor from "./zero/shortcut-cryptor"

const handlers: IDomCompleteHandler[] = []

handlers.push(new ContentEditablePasteHandler("www.lofter.com"))
handlers.push(new AutoCryptorDomHandler())
handlers.push(new AutoDecryptorComposite()) // AutoDecryptorComposite MUST be the front of DomDecryptorComposite
handlers.push(new DomDecryptorComposite())
handlers.push(new ShortcutCryptor())

window.onload = () =>
    handlers.forEach(handler => {
        handler.support(window.location.host, window.location.href) && handler.handle()
    })

