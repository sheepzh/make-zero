import cryptionExcutor from "../../service/cryption-excutor"
import AbstractAutoDecryptor from "./abstract-auto-decryptor"

export default class DefaultDecryptor extends AbstractAutoDecryptor {
  /**
  * @since 1.1.2 
  */
  private mutationObserver: MutationObserver = new MutationObserver((mutations: MutationRecord[], _this_: MutationObserver) => {
    mutations.forEach(mutation => {
      const addedNodes: NodeList = mutation.addedNodes
      addedNodes.forEach(node => {
        const needDeryct: boolean = '#text' === node.nodeName
        if (!needDeryct) {
          return
        }
        const cipher = node.textContent
        if (cryptionExcutor.support(cipher)) {
          cryptionExcutor.decrypt(cipher).then(plain => node.textContent = plain)
        }
      })
    })
  })

  support(host: string): boolean {
    return true
  }

  handle(): void {
    this.decriptAll()
    this.registerObserver()
  }

  private decriptAll() {
    this.decriptByTag("p")
      .decriptByTag("pre")
      .decriptByTag('span')
  }

  private decriptByTag(tagName: string): DefaultDecryptor {
    const elements = document.getElementsByTagName(tagName)
    Array.from(elements)
      .filter((ele: HTMLElement, _index: number) => {
        const support: boolean = cryptionExcutor.support(ele.innerText)
        if (support && !super.hasMarked(ele)) {
          super.mark(ele)
        }
        return support
      })
      .forEach((ele: HTMLElement) => cryptionExcutor.decrypt(ele.innerText).then(plain => ele.innerText = plain))
    return this
  }

  private registerObserver() {
    const body = document.body
    const obseroverOptions: MutationObserverInit = { childList: true, subtree: true }
    this.mutationObserver.observe(body, obseroverOptions)
  }
}