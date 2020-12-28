import IDomCompleteHandler from "./chrome/interface/i-dom-complete-hanler";
import AutoCryptorDomHanlder from './components/sns-zero/auto-cryptor-dom-hanlder';
import AutoDecryptorComposite from "./components/sns-zero/auto-decrypt";
import DomDecryptorComposite from './components/sns-zero/dbclick'

const handlers: IDomCompleteHandler[] = []

handlers.push(new AutoCryptorDomHanlder())
handlers.push(new AutoDecryptorComposite()) // AutoDecryptorComposite must be the front of DomDecryptorComposite
handlers.push(new DomDecryptorComposite())

window.onload = () =>
    handlers.forEach(handler => {
        handler.support(window.location.host, window.location.href) && handler.handle()
    })

