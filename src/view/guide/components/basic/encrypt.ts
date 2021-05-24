import { ElButton, ElInput, ElMessage } from "element-plus"
import { defineComponent, h, reactive } from "vue"
import { t, tN } from "../../../plugin/i18n"
import { boldAndItalic } from "../../../util/vue-util"
import { read as readClipboard } from 'clipboardy'

/**
 * How to encrypt
 */
export default defineComponent({
  name: 'BasicEncrypt',
  setup() {
    // only for input editing
    return reactive({ ciphertext: '' })
  },
  methods: {
    selectText() {
      const span = this.$refs.spanToSelect
      const text: string = span.innerHTML
      // Use window.find to select the text
      // Forwards || backwards
      window.find(text, true) || window.find(text, true, true)
    },
    pasteCiphertext() {
      readClipboard()
        .then((content: string) => {
          this.ciphertext = content || ''
        }).catch(e => {
          ElMessage({
            message: t('guide.basic.pasteError'),
            duration: 2000,
            type: 'error'
          })
        })
    }
  },
  render(_ctx: any) {
    const title = () => h('h3', t('guide.basic.encrypt.title'))
    // step 1
    const first = () => h('p', [
      h('a', { class: 'step-sort' }, '1. '),
      h('span', { ref: 'spanToSelect' }, t('guide.basic.encrypt.selectText')),
      h('a', { href: '#', onClick: _ctx.selectText }, t('guide.basic.clickMe')),
      t('guide.period')
    ])
    // step 2
    const alert2 = tN('guide.basic.encrypt.rightClick', {
      shortcut: boldAndItalic(t('guide.basic.shortcut')),
      menuItemPath: boldAndItalic(`${t('app.name')} >> ${t('contextMenu.encrypt')}`)
    })
    const second = () => h('p', [
      h('a', { class: 'step-sort' }, '2. '),
      ...alert2
    ])
    // step 3  Paste to show the ciphertexts
    const alert3 = tN('guide.basic.encrypt.paste', { btn: boldAndItalic(t('guide.basic.encrypt.pasteButton')) })
    const third = () => [
      h('p', [
        h('a', '3. '),
        ...alert3
      ]),
      h(ElInput,
        {
          placeholder: t('guide.basic.encrypt.pasteInputHolder'),
          style: 'width:500px;',
          clearable: true,
          modelValue: _ctx.ciphertext,
          onInput: (val: string) => _ctx.ciphertext = val,
          onClear: () => _ctx.ciphertext = ''
        },
        {
          append: () => h(ElButton,
            {
              icon: 'el-icon-document-copy',
              onClick: _ctx.pasteCiphertext
            },
            { default: () => t('guide.basic.encrypt.pasteButton') }
          )
        }
      )
    ]
    return h('div', [title(), first(), second(), ...third()])
  }
})

