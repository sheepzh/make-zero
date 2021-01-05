import cryptor from "../cryptor"
import FloatAlert from "./float-alert"
import $ = require('jquery')
import AbstractDomDecryptor from "./abstract-dom-decryptor"

export default class DefaultDecryptor extends AbstractDomDecryptor {
  private static ELE_TYPES_2_LISTEN = ['span', 'p', 'pre']
  private floatAlert: FloatAlert

  support(host: string): boolean {
    return true
  }

  handle(): void {
    this.floatAlert = new FloatAlert($('body'))
    DefaultDecryptor.ELE_TYPES_2_LISTEN.forEach(
      eleName => this.addListener($(eleName))
    )
    this.registerObserver()
  }

  private addListener(selecotor: JQuery) {
    const _this_ = this
    selecotor.filter((index: number, el: HTMLElement) => {
      const support = cryptor.support(el.innerText)
      if (support && !super.hasMarked(el)) {
        super.mark(el)
      }
      return support
    }).on("mouseover", e => _this_.mouseover(e.currentTarget, e.pageX, e.pageY))
      .on("mouseout", () => _this_.floatAlert.hide())
  }

  private registerObserver() {
    const observer: MutationObserver = new MutationObserver((mutations: MutationRecord[], _this_: MutationObserver) => {
      mutations.forEach((mutation) => {
        const addedNodes: NodeList = mutation.addedNodes
        addedNodes.forEach(node => {
          const element: HTMLElement = node.parentElement
          const needDeryct: boolean = '#text' === node.nodeName
            && !element.getAttribute('contenteditable') // exclude the contenteditable elements
          if (needDeryct) {
            const cipher = node.textContent
            if (cryptor.support(cipher)) {
              // listen to the outer element of the text
              element.onmouseover = (e: MouseEvent) => this.mouseover(element, e.pageX, e.pageY)
              element.onmouseout = () => this.floatAlert.hide()
            }
          }
        })
      })
    })

    const body = document.body
    const obseroverOptions: MutationObserverInit = { childList: true, subtree: true }
    observer.observe(body, obseroverOptions)
  }

  private mouseover(element: HTMLElement, x: number, y: number) {
    const innerText: string = element.innerText

    if (!cryptor.support(innerText)) {
      // return if not support
      return
    }

    this.floatAlert.show(y, x)

    element.ondblclick = () => {
      const innerText = element.innerText
      if (cryptor.support(innerText)) {
        const plain: string = cryptor.decrypt(innerText)
        element.innerHTML = plain
        this.floatAlert.hide()
      }
    }
  }
}