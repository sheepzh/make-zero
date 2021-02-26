import Initializable from "../../chrome/interface/initializable"

/**
 * Open the guide page
 *  
 * @since 1.4.0
 */
export function openGuide() {
  const isFireFox = /Firefox[\/\s](\d+\.\d+)/.test(navigator.userAgent)
  // FireFox use 'static' as prefix
  const url = isFireFox ? 'guide.html' : 'static/guide.html'
  chrome.tabs.create({ url })
}

export default class GuideOpener implements Initializable {
  initialize(): void {
    openGuide()
  }
}