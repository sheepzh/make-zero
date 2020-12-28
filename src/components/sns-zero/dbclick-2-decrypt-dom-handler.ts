import IDomCompleteHandler from "../../chrome/interface/i-dom-complete-hanler";
import Cryptor from './cryptor';
import $ = require('jquery')
import FloatAlert from './alert/float-alert'

/**
 * Show the float button while the user moves its mouse on <p> tags within ciphertexts
 * @author zhy
 */
export default class DoubleClick2DecryptDomHandler implements IDomCompleteHandler {
  private cryptor: Cryptor = new Cryptor()
  private floatAlert: FloatAlert

  support(host: string, href: string): boolean {
    return host !== "wx2.qq.com"
  }
  handle(): void {
    const _this_ = this
    _this_.floatAlert = new FloatAlert($('body'))

    $('p').filter((index: number, el: HTMLElement) => {
      return _this_.cryptor.support(el.innerText)
    }).on("mouseover", (e: JQuery.MouseOverEvent<HTMLElement, undefined, HTMLElement, HTMLElement>) => {
      const p: HTMLElement = e.currentTarget
      const innerText: string = p.innerText

      if (!_this_.cryptor.support(innerText)) {
        // return if not support
        return
      }

      _this_.floatAlert.show(e.pageY, e.pageX)

      p.ondblclick = () => {
        const innerText = p.innerText
        if (_this_.cryptor.support(innerText)) {
          const plain: string = _this_.cryptor.decrypt(innerText)
          p.innerHTML = plain
          _this_.floatAlert.hide()
        }
      }
    }).on("mouseout", () => {
      // hide the alert if the mouse is out
      _this_.floatAlert.hide()
    })
  }
}