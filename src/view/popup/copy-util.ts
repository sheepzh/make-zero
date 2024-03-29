import clipboardy from 'clipboardy'
import { ElNotification } from 'element-plus'
import { t } from './locale'

export default function copy(txt: string) {
  clipboardy.write(txt).then(_r => {
    ElNotification({
      message: t(msg => msg.button.copied),
      duration: 1000,
      type: 'success'
    })
  }).catch(e => {
    console.log(e)
  })
}