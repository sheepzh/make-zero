import IDomCompleteHandler from "./chrome/interface/i-dom-complete-hanler";
import ContentEditablePasteHandler from "./components/common/content-editable-paste-handler";
import AutoCryptorDomHanlder from './components/zero/auto-cryptor-dom-hanlder';
import AutoDecryptorComposite from "./components/zero/auto-decrypt";
import DomDecryptorComposite from './components/zero/dbclick'

const handlers: IDomCompleteHandler[] = []

handlers.push(new ContentEditablePasteHandler("www.lofter.com"))
handlers.push(new AutoCryptorDomHanlder())
handlers.push(new AutoDecryptorComposite()) // AutoDecryptorComposite MUST be the front of DomDecryptorComposite
handlers.push(new DomDecryptorComposite())

window.onload = () =>
    handlers.forEach(handler => {
        handler.support(window.location.host, window.location.href) && handler.handle()
    })

