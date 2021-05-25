import AbstractDomDecryptor from './abstract-dom-decryptor'

export default class WeiboDecryptor extends AbstractDomDecryptor {
  support(host: string): boolean {
    return 'weibo.com' === host
  }
  handle(): void {
    Array.from(document.getElementsByClassName('WB_text')).forEach(
      (ele: HTMLElement) => {
        const children: HTMLCollection = ele.children
        for (let i = 0; i < children.length; i++) {
          // find the <a>展开全文</a>
          const child = children[i]
          if (child.tagName === 'A' && child.className === 'WB_text_opt') {
            console.log(child.innerHTML)
          }
        }
      }
    )
  }
}