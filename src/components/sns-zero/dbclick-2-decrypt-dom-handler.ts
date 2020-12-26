import IDomCompleteHandler from "../../chrome/interface/i-dom-complete-hanler";
import Cryptor from './cryptor';
import $ = require('jquery')
import creatAlert from './alert/float-alert'

/**
 * Show the float button while the user moves its mouse on <p> tags within ciphertexts
 * @author zhy
 */
export default class DoubleClick2DecryptDomHandler implements IDomCompleteHandler {
  private cryptor: Cryptor = new Cryptor()
  private floatAlert: JQuery<HTMLElement> = creatAlert()

  constructor() {
  }

  support(host: string, href: string): boolean {
    return host !== "wx2.qq.com"
  }
  handle(): void {
    const _this_ = this
    _this_.initAlert()

    $('p').filter((index: number, el: HTMLElement) => {
      return _this_.cryptor.support(el.innerText)
    }).on("mouseover", (e: JQuery.MouseOverEvent<HTMLElement, undefined, HTMLElement, HTMLElement>) => {
      const p: HTMLElement = e.currentTarget
      const cipherText: string = p.innerText
      if (!_this_.cryptor.support(cipherText)) {
        return
      }

      _this_.showAlert(e.pageY, e.pageX)

      p.ondblclick = () => {
        if (_this_.cryptor.support(cipherText)) {
          const plain: string = _this_.cryptor.decrypt(cipherText)
          p.innerHTML = plain
          _this_.hideAlert()
        }
      }
    }).on("mouseout", () => {
      // hide the alert if the mouse is out
      _this_.hideAlert()
    })
  }

  private initAlert() {
    $('body').append(this.floatAlert)
    this.floatAlert.hide()
  }

  /**
   * Show the float alert
   */
  private showAlert(top: number, left: number) {
    this.floatAlert.css({ top, left })
    this.floatAlert.show()
  }

  private hideAlert() {
    this.floatAlert.hide()
  }
}