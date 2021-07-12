import { ElAlert } from 'element-plus'
import { computed, defineComponent, h, ref } from 'vue'
import cryptionExcutor from '../../../../service/cryption-excutor'
import cryptorConfig from '../../../../config'
import { CIPHER_ATTR_NAME, PLAIN_ATTR_NAME } from '../../../../zero/dbclick'
import { t } from '../../locale'

// Initialize
const on = ref(false)
const foo = ref(t(msg => msg.welcome))
cryptorConfig.getAutoDecrypt().then(ad => {
  on.value = ad
  !ad && cryptionExcutor.encrypt(foo.value).then(cipher => foo.value = cipher)
})

const ciphertextAttrName = computed(() => on.value ? PLAIN_ATTR_NAME : CIPHER_ATTR_NAME)

export default defineComponent(() => {
  const alertText = t(msg => on.value ? msg.autoDecryption.alertIfOn : msg.autoDecryption.alertIfOff)
  const alertType = on.value ? 'success' : 'warning'
  const textProp = { style: 'text-indent:2em;' }
  textProp[ciphertextAttrName.value] = true
  const title = () => h('h2', t(msg => msg.autoDecryption.title))
  const alertInfo = () => h(ElAlert, { type: alertType }, { default: () => alertText })
  const text = () => h('p', textProp, foo.value)
  return () => h('div', { class: 'guide-container' }, [
    title(),
    alertInfo(),
    text()
  ])
})