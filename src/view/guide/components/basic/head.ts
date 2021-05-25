import { defineComponent, h, reactive } from "@vue/runtime-core"
import { ElAlert } from "element-plus"
import cryptorConfig from "../../../../config"
import { t } from "../../../plugin/i18n"

/**
 * Head of this page
 */
export default defineComponent({
  name: 'BasicHead',
  setup(_props) {
    return reactive({ password: '' })
  },
  created() {
    cryptorConfig.getPassword().then(p => this.password = p)
  },
  render(_ctx: any) {
    return h('div', {},
      [
        // title
        h('h2', {}, t('guide.basic.title')),
        // alert
        h(ElAlert,
          { type: 'success' },
          {
            title: () => [
              t('guide.basic.currentPassword'),
              h('b', {}, h('i', {}, _ctx.password)),
              t('guide.period')
            ]
          }
        )
      ]
    )
  }
})