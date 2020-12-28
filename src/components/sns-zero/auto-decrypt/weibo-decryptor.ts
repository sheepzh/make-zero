import { AutoDecryptor } from ".";
import swal from 'sweetalert2'

export default class WeiboDecryptor implements AutoDecryptor {
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