import { DomDecryptor } from "."
import Cryptor from "../cryptor"
import FloatAlert from "./float-alert"
import $ = require('jquery')

export default class DefaultDecryptor implements DomDecryptor {
  private floatAlert: FloatAlert
  private cryptor: Cryptor = new Cryptor()

  constructor() { }

  support(host: string): boolean {
    return true
  }
  handle(): void {
    this.floatAlert = new FloatAlert($('body'))
    this.addListener($('p'))
    this.addListener($('pre'))
  }

  private addListener(selecotor: JQuery) {
    const _this_ = this
    selecotor.filter((index: number, el: HTMLElement) => {
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