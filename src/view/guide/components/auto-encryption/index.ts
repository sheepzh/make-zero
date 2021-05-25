import { ElAlert, ElForm, ElFormItem, ElInput } from 'element-plus'
import { defineComponent, h, reactive } from 'vue'
import cryptorConfig from '../../../../config'
import { t } from '../../../plugin/i18n'

export default defineComponent({
  name: 'AutoEncryption',
  setup() {
    return reactive({
      on: false,
      foo: '',
      bar: ''
    })
  },
  created() {
    cryptorConfig.getAutoFill()
      .then(af => this.on = af)
  },
  render(_ctx: any) {
    const title = () => h('h2', t('guide.autoEncryption.title'))
    const alertText = t(`guide.autoEncryption.${_ctx.on ? 'alertIfOn' : 'alertIfOff'}`)
    const alertType = _ctx.on ? 'success' : 'warning'
    const alertInfo = () => h(ElAlert, { type: alertType }, { default: () => alertText })
    const formFoo = () => h(ElFormItem,
      { label: t('guide.autoEncryption.form1') },
      () => h(ElInput,
        {
          modelValue: _ctx.foo,
          disabled: !_ctx.on,
          clearable: true,
          onClear: () => _ctx.foo = '',
          onInput: (val: string) => _ctx.foo = val
        }
      )
    )
    const formBar = () => h(ElFormItem,
      { label: t('guide.autoEncryption.form2') },
      () => h(ElInput,
        {
          modelValue: _ctx.bar,
          type: 'textarea',
          rows: 4,
          disabled: !_ctx.on,
          clearable: true,
          onClear: () => _ctx.bar = '',
          onInput: (val: string) => _ctx.bar = val
        }
      )
    )
    const form = () => h(ElForm, { labelWidth: '120px', labelPosition: 'left' }, () => [formFoo(), formBar()])
    const formP = () => h('p', {}, form())
    return h('div', { class: 'guide-container' }, [title(), alertInfo(), formP()])
  }
})