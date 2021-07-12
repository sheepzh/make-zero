import { defineComponent, h, ref } from "vue"
import { ElAlert } from "element-plus"
import cryptorConfig from "../../../../config"
import { boldAndItalic } from "../../vue-util"
import { t } from "../../locale"

/**
 * Head of this page
 */
const _default = defineComponent<{}, {}>(() => {
  const password = ref('')

  cryptorConfig.getPassword().then(p => password.value = p)

  return () => h('div',
    [
      // title
      h('h2', t(msg => msg.basic.title)),
      // alert
      h(ElAlert,
        { type: 'success' },
        {
          title: () => [
            t(msg => msg.basic.currentPassword),
            boldAndItalic(password.value),
            t(msg => msg.period)
          ]
        }
      )
    ]
  )
})

export default _default