import { ElButton, ElCol, ElForm, ElFormItem, ElInput, ElOption, ElRow, ElSelect, ElSwitch, ElTooltip } from "element-plus"
import { defineComponent, reactive, h } from "vue"
import cryptor from "../../../zero/cryptor"
import cryptorConfig from "../../../zero/cryptor-config"
import { t } from "../../plugin/i18n"
import copy from "../../util/copy-util"

const maxVersion = cryptor.version()
/**
 * Setting panel
 */
export default defineComponent({
  name: 'AppSettings',
  setup() {
    return reactive({
      password: '',
      autoEncrypt: false,
      autoDecrypt: false,
      cipherVersion: 1
    })
  },
  created() {
    cryptorConfig.getPassword(password => this.password = password)
    cryptorConfig.getAutoFill().then(isOn => this.autoEncrypt = !!isOn)
    cryptorConfig.getAutoDecrypt(isOn => this.autoDecrypt = !!isOn)
    cryptorConfig.getCipherVersion(version => this.cipherVersion = version)
  },
  render(_ctx: any) {
    // Auto encryption
    const line0Col0 = () => h(ElCol, { span: 12 },
      () => h(ElFormItem, {},
        {
          default: () => h(ElSwitch, {
            modelValue: _ctx.autoEncrypt,
            onChange: (val: boolean) => cryptorConfig.changeAutoFill(_ctx.autoEncrypt = val)
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
            modelValue: _ctx.autoDecrypt,
            onChange: (val: boolean) => cryptorConfig.changeAutoDecrypt(_ctx.autoDecrypt = val)
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
        { modelValue: _ctx.password, onChange: (val: string) => cryptorConfig.changePassword(_ctx.password = val) },
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
      h(ElSelect, { modelValue: _ctx.cipherVersion, onChange: (val: number) => cryptorConfig.changeCipherVersion(_ctx.cipherVersion = val) },
        () => formatOptions()
      )
    )

    return h(ElForm, { labelPosition: 'left', labelWidth: '105px' }, () => [line0(), line1(), line2()])
  }
})