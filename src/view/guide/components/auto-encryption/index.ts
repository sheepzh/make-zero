import { ElAlert, ElForm, ElFormItem, ElInput } from 'element-plus'
import { defineComponent, h, reactive, UnwrapRef } from 'vue'
import cryptorConfig from '../../../../config'
import { t } from '../../locale'

type RawBinding = {
  on: boolean
  foo: string
  bar: string
}

const binding: UnwrapRef<RawBinding> = reactive({
  on: false,
  foo: '',
  bar: ''
})

async function init() {
  const autoFill: boolean = await cryptorConfig.getAutoFill()
  binding.on = autoFill
}
init()

const _default = defineComponent<{}, RawBinding>(() => {
  const title = () => h('h2', t(msg => msg.autoEncryption.title))
  const alertText = t(msg => binding.on ? msg.autoEncryption.alertIfOn : msg.autoEncryption.alertIfOff)
  const alertType = binding.on ? 'success' : 'warning'
  const alertInfo = () => h(ElAlert, { type: alertType }, { default: () => alertText })
  const formFoo = () => h(ElFormItem,
    { label: t(msg => msg.autoEncryption.form1) },
    () => h(ElInput,
      {
        modelValue: binding.foo,
        disabled: !binding.on,
        clearable: true,
        onClear: () => binding.foo = '',
        onInput: (val: string) => binding.foo = val
      }
    )
  )
  const formBar = () => h(ElFormItem,
    { label: t(msg => msg.autoEncryption.form2) },
    () => h(ElInput,
      {
        modelValue: binding.bar,
        type: 'textarea',
        rows: 4,
        disabled: !binding.on,
        clearable: true,
        onClear: () => binding.bar = '',
        onInput: (val: string) => binding.bar = val
      }
    )
  )
  const form = () => h(ElForm, { labelWidth: '120px', labelPosition: 'left' }, () => [formFoo(), formBar()])
  const formP = () => h('p', {}, form())
  return () => h('div', { class: 'guide-container' }, [title(), alertInfo(), formP()])
})

export default _default