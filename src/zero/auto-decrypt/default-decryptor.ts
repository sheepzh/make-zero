import cryptoExecutor from "../../service/crypto-executor"
import AbstractAutoDecryptor from "./abstract-auto-decryptor"

export default class DefaultDecryptor extends AbstractAutoDecryptor {
  /**
  * @since 1.1.2 
  */
  private mutationObserver: MutationObserver = new MutationObserver((mutations: MutationRecord[], _this_: MutationObserver) => {
    mutations.forEach(mutation => {
      const addedNodes: NodeList = mutation.addedNodes
      addedNodes.forEach(node => {
        const needDecrypt: boolean = '#text' === node.nodeName
        if (!needDecrypt) {
          return
        }
        const cipher = node.textContent
        if (cryptoExecutor.support(cipher)) {
          cryptoExecutor.decrypt(cipher).then(plain => node.textContent = plain)
        }
      })
    })
  })

  support(host: string): boolean {
    return true
  }

  handle(): void {
    this.decryptAll()
    this.registerObserver()
  }

  private decryptAll() {
    this.decryptByTag("p")
      .decryptByTag("pre")
      .decryptByTag('span')
  }

  private decryptByTag(tagName: string): DefaultDecryptor {
    const elements = document.getElementsByTagName(tagName)
    Array.from(elements)
      .filter((ele: HTMLElement, _index: number) => {
        const support: boolean = cryptoExecutor.support(ele.innerText)
        if (support && !super.hasMarked(ele)) {
          super.mark(ele)
        }
        return support
      })
      .forEach((ele: HTMLElement) => cryptoExecutor.decrypt(ele.innerText).then(plain => ele.innerText = plain))
    return this
  }

  private registerObserver() {
    const body = document.body
    const observerOptions: MutationObserverInit = { childList: true, subtree: true }
    this.mutationObserver.observe(body, observerOptions)
  }
}