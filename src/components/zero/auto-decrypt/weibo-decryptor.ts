import swal from 'sweetalert2'
import AbstractAutoDecryptor from './abstract-auto-decryptor'

export default class WeiboDecryptor extends AbstractAutoDecryptor {
  support(host: string): boolean {
    return 'weibo.com' === host
  }
  handle(): void {
    swal.fire({
      text: 'Sorry 啦，暂时还不支持微博自动解密哦！',
      toast: true,
      timer: 2000,
      position: 'center',
      showConfirmButton: false
    })
  }
}