import { ElAlert } from 'element-plus'
import { defineComponent, h, reactive } from 'vue'
import cryptionExcutor from '../../../../service/cryption-excutor'
import cryptorConfig from '../../../../config'
import { CIPHER_ATTR_NAME, PLAIN_ATTR_NAME } from '../../../../zero/dbclick'
import { t } from '../../../plugin/i18n'

export default defineComponent({
  name: 'AutoDecryption',
  setup() {
    return reactive({
      on: false,
      foo: t('guide.welcome')
    })
  },
  computed: {
    ciphertextAttrName() {
      return this.on ? PLAIN_ATTR_NAME : CIPHER_ATTR_NAME
    }
  },
  created() {
    cryptorConfig.getAutoDecrypt().then(
      ad => {
        console.log(ad)
        this.on = ad
        !ad && cryptionExcutor.encrypt(this.foo).then(cipher => this.foo = cipher)
      }
    )
  },
  render(_ctx: any) {
    const alertText = t(`guide.autoDecryption.${_ctx.on ? 'alertIfOn' : 'alertIfOff'}`)
    const alertType = _ctx.on ? 'success' : 'warning'
    const textProp = { style: 'text-indent:2em;' }
    textProp[_ctx.ciphertextAttrName] = true
    const title = () => h('h2', t('guide.autoDecryption.title'))
    const alertInfo = () => h(ElAlert, { type: alertType }, { default: () => alertText })
    const text = () => h('p', textProp, _ctx.foo)
    return h('div', { class: 'guide-container' }, [
      title(),
      alertInfo(),
      text()
    ])
  }
})