import AbstractAutoDecryptor from './abstract-auto-decryptor'
/**
 * Replace sweetalert2 with element-ui
 * @since 1.4.1 
 */
import { Message } from 'element-ui'
import 'element-ui/lib/theme-chalk/message.css'

export default class WeiboDecryptor extends AbstractAutoDecryptor {
  support(host: string): boolean {
    return 'weibo.com' === host
  }
  handle(): void {
    Message({ message: chrome.i18n.getMessage("message_unsupportedWeiboDecAuto"), duration: 2000, type: 'warning' })
  }
}