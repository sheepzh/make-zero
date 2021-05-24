import AbstractAutoDecryptor from './abstract-auto-decryptor'
/**
 * Replace sweetalert2 with element-ui
 * @since 1.4.1 
 */
import { ElMessage } from 'element-plus'
import 'element-plus/lib/theme-chalk/el-message.css'

export default class WeiboDecryptor extends AbstractAutoDecryptor {
  support(host: string): boolean {
    return 'weibo.com' === host
  }
  handle(): void {
    ElMessage({ message: chrome.i18n.getMessage("message_unsupportedWeiboDecAuto"), duration: 2000, type: 'warning' })
  }
}