import cryptor from "../cryptor";
import $ = require('jquery')
import AbstractAutoDecryptor from "./abstract-auto-decryptor";

export default class DefaultDecryptor extends AbstractAutoDecryptor {
  /**
  * @since 1.1.2 
  */
  private mutationObserver: MutationObserver = new MutationObserver((mutations: MutationRecord[], _this_: MutationObserver) => {
    mutations.forEach(mutation => {
      const addedNodes: NodeList = mutation.addedNodes
      addedNodes.forEach(node => {
        const needDeryct: boolean = '#text' === node.nodeName
        if (needDeryct) {
          const cipher = node.textContent
          if (cryptor.support(cipher)) {
            node.textContent = cryptor.decrypt(cipher)
          }
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
    this.decript($("p"))
    this.decript($("pre"))
    this.decript($('span'))
  }

  private decript(selector: JQuery) {
    selector
      .filter((index, p) => {
        const support: boolean = cryptor.support(p.innerText)
        if (support && !super.hasMarked(p)) {
          super.mark(p)
        }
        return support
      }).each((index, p) => { p.innerText = cryptor.decrypt(p.innerText) })
  }

  private registerObserver() {
    const body = document.body
    const obseroverOptions: MutationObserverInit = { childList: true, subtree: true }
    this.mutationObserver.observe(body, obseroverOptions)
  }
}