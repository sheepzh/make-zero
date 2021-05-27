import { defineComponent, h, ref } from "vue"
import { ElAlert } from "element-plus"
import cryptorConfig from "../../../../config"
import { t } from "../../../plugin/i18n"
import { boldAndItalic } from "../../../util/vue-util"

/**
 * Head of this page
 */
const _default = defineComponent<{}, {}>(() => {
  const password = ref('')

  cryptorConfig.getPassword().then(p => password.value = p)

  return () => h('div',
    [
      // title
      h('h2', t('guide.basic.title')),
      // alert
      h(ElAlert,
        { type: 'success' },
        {
          title: () => [
            t('guide.basic.currentPassword'),
            boldAndItalic(password.value),
            t('guide.period')
          ]
        }
      )
    ]
  )
})

export default _default