import { ElButton, ElCol, ElForm, ElFormItem, ElInput, ElOption, ElRow, ElSelect, ElSwitch, ElTooltip } from "element-plus"
import { defineComponent, reactive, h, UnwrapRef } from "vue"
import cryptor from "../../../cryptor"
import cryptorConfig from "../../../config"
import { t } from "../../plugin/i18n"
import copy from "../../util/copy-util"

const maxVersion = cryptor.version()

type RawBinding = ConfigInfo

const syncDb = (binding: UnwrapRef<RawBinding>) => {
  cryptorConfig.getPassword().then(password => binding.password = password)
  cryptorConfig.getAutoFill().then(isOn => binding.autoFill = !!isOn)
  cryptorConfig.getAutoDecrypt().then(isOn => binding.autoDecrypt = !!isOn)
  cryptorConfig.getCipherVersion().then(version => binding.cipherVersion = version)
}

/**
 * Setting panel
 */
export default defineComponent<{}, RawBinding>(() => {
  const binding: UnwrapRef<RawBinding> = reactive({
    password: '',
    autoFill: false,
    autoDecrypt: false,
    cipherVersion: 1
  })
  // Sync from db
  syncDb(binding)


  // Auto encryption
  const line0Col0 = () => h(ElCol, { span: 12 },
    () => h(ElFormItem, {},
      {
        default: () => h(ElSwitch, {
          modelValue: binding.autoFill,
          onChange: (val: boolean) => cryptorConfig.changeAutoFill(binding.autoFill = val)
        }),
        label: () => {
          const vnodes = []
          vnodes.push(h('span', {}, t('setting.auto.encryptLabel')))
          const infoTooltip = h(ElTooltip, { placement: 'top' },
            {
              content: () => h('p', {}, t('setting.auto.encryptTip')),
              default: () => h('i', { class: 'el-icon-question' })
            }
          )
          vnodes.push(infoTooltip)
          return vnodes
        }
      }
    )
  )
  // Auto decryption
  const line0Col1 = () => h(ElCol, { span: 12 },
    () => h(ElFormItem, {},
      {
        default: () => h(ElSwitch, {
          modelValue: binding.autoDecrypt,
          onChange: (val: boolean) => cryptorConfig.changeAutoDecrypt(binding.autoDecrypt = val)
        }
        ),
        label: () => {
          const vnodes = []
          vnodes.push(h('span', {}, t('setting.auto.decryptLabel')))
          const infoTooltip = h(ElTooltip, { placement: 'top' },
            {
              content: () => h('p', {}, t('setting.auto.decryptTip')),
              default: () => h('i', { class: 'el-icon-question' })
            }
          )
          vnodes.push(infoTooltip)
          return vnodes
        }
      }
    )
  )

  const line0 = () => h(ElRow, { gutter: 10 }, () => [line0Col0(), line0Col1()])

  // Password
  const line1 = () => h(ElFormItem, { label: t('setting.password.title') }, () =>
    h(ElInput,
      {
        modelValue: binding.password,
        onInput: (val: string) => cryptorConfig.changePassword(binding.password = val)
      },
      {
        append: () => h(ElTooltip, { content: t('button.copy') }, () => h(ElButton, { icon: 'el-icon-copy-document', class: 'copy-append', onClick: (val: string) => copy(val) }))
      }
    )
  )

  // Cipher format
  const formatOptions = () =>
    Array.from(Array(maxVersion).keys())
      .map(index => index + 1)
      .map(no => h(ElOption, { value: no, label: no + '. ' + t(`setting.cipherType.remark.${no}`) }))
  const line2 = () => h(ElFormItem, { label: t('setting.cipherType.label') }, () =>
    h(ElSelect, { modelValue: binding.cipherVersion, onChange: (val: number) => cryptorConfig.changeCipherVersion(binding.cipherVersion = val) },
      () => formatOptions()
    )
  )

  return () => h(ElForm, { labelPosition: 'left', labelWidth: '105px' }, () => [line0(), line1(), line2()])
})