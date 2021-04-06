import Initializable from "../../chrome/interface/initializable"

/**
 * Open the guide page
 *  
 * @since 1.4.0
 */
export function openGuide(includingStatic?: boolean) {
  const ua = navigator.userAgent
  includingStatic = includingStatic || !/Firefox[\/\s](\d+\.\d+)/.test(ua)
  // FireFox use 'static' as prefix
  const url = includingStatic ? 'static/guide.html' : 'guide.html'
  chrome.tabs.create({ url })
}

export default class GuideOpener implements Initializable {
  initialize(): void {
    openGuide(true)
  }
}