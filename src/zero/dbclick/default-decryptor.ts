import cryptionExcutor from "../../service/cryption-excutor"
import FloatAlert from "./float-alert"
import AbstractDomDecryptor from "./abstract-dom-decryptor"
import { CIPHER_ATTR_NAME } from "."


export default class DefaultDecryptor extends AbstractDomDecryptor {
  private static ELE_TYPES_2_LISTEN = ['span', 'p', 'pre']
  private floatAlert: FloatAlert

  support(_host: string): boolean {
    return true
  }

  /**
   * The node with only one text child needs to listen
   * 
   * @since 1.6.2
   */
  needListen(ele: HTMLElement) {
    const node: Node = ele as Node
    const childNodes = node.childNodes
    return childNodes && childNodes.length === 1 && childNodes[0].nodeName === '#text'
  }

  handle(): void {
    this.floatAlert = new FloatAlert(document.body as HTMLBodyElement)
    DefaultDecryptor.ELE_TYPES_2_LISTEN.forEach(
      eleName => {
        const elements = document.getElementsByTagName(eleName)
        Array.from(elements)
          .filter(ele => ele instanceof HTMLElement)
          .map(ele => ele as HTMLElement)
          .filter(ele => this.needListen(ele))
          .forEach(ele => this.addListener(ele))
      }
    )
    this.registerObserver()
  }

  private addListener(ele: HTMLElement) {
    const _this_ = this

    const support = ele.hasAttribute(CIPHER_ATTR_NAME) || cryptionExcutor.support(ele.innerText)
    if (support && !super.hasMarked(ele)) {
      super.mark(ele)
    }
    if (support) {
      ele.onmouseover = e => _this_.mouseover(ele, e.pageX, e.pageY)
      ele.onmouseout = () => _this_.floatAlert.hide()
    }
  }

  private registerObserver() {
    const observer: MutationObserver = new MutationObserver((mutations: MutationRecord[], _this_: MutationObserver) => {
      mutations.forEach((mutation) => {
        const addedNodes: NodeList = mutation.addedNodes
        addedNodes.forEach(node => {
          const element: HTMLElement = node.parentElement
          const needDeryct: boolean = '#text' === node.nodeName && !!element
            && !element.getAttribute('contenteditable') // exclude the contenteditable elements
          if (needDeryct) {
            const cipher = node.textContent
            if (cryptionExcutor.support(cipher)) {
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

    if (!cryptionExcutor.support(innerText)) {
      // return if not support
      return
    }

    this.floatAlert.show(y, x)

    element.ondblclick = () => {
      const innerText = element.innerText
      if (cryptionExcutor.support(innerText)) {
        cryptionExcutor.decrypt(innerText)
          .then(plain => {
            element.innerHTML = plain
          })
        this.floatAlert.hide()
      }
    }
  }
}