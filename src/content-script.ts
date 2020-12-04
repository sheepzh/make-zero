import IDomCompleteHandler from "./chrome/interface/i-dom-complete-hanler";
import CryptorDomHanlder from './components/sns-zero/cryptor-dom-hanlder';

const handlers: IDomCompleteHandler[] = []

handlers.push(new CryptorDomHanlder())

window.onload = () =>
    handlers.forEach(handler => {
        handler.support(window.location.host, window.location.href) && handler.handle()
    })

