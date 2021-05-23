import { write as copy0 } from 'clipboardy'
import { ElNotification } from 'element-plus'
import t from '../plugin/i18n'
export default function copy(txt: string) {
  copy0(txt).then(r => {
    ElNotification({
      message: t('button.copied'),
      duration: 1000,
      type: 'success'
    })
  }).catch(e => {
    console.log(e)
  })
}