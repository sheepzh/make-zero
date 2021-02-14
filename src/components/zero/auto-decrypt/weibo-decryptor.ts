import swal from 'sweetalert2'
import AbstractAutoDecryptor from './abstract-auto-decryptor'

export default class WeiboDecryptor extends AbstractAutoDecryptor {
  support(host: string): boolean {
    return 'weibo.com' === host
  }
  handle(): void {
    swal.fire({
      text: chrome.i18n.getMessage("message_unsupportedWeiboDecAuto"),
      toast: true,
      timer: 2000,
      position: 'center',
      showConfirmButton: false
    })
  }
}