import { defineComponent, h, ref } from 'vue'
import cryptionExcutor from '../../../../service/cryption-excutor'
import { CIPHER_ATTR_NAME } from '../../../../zero/dbclick'
import { t, tN } from '../../locale'
import { boldAndItalic } from '../../vue-util'

const ciphertextExample = ref('')
cryptionExcutor.encrypt(t(msg => msg.welcome)).then(cipher => ciphertextExample.value = cipher)

const selectCiphertext = () => window.find(ciphertextExample.value) || window.find(ciphertextExample.value, true, true)

/**
 * How to decrypt
 */
const _default = defineComponent(() => {
  // title
  const title = () => h('h3', t(msg => msg.basic.decrypt.title))
  // step 1
  const exampleProp = { style: 'text-indent:2em;' }
  exampleProp[CIPHER_ATTR_NAME] = true
  const alert1 = () =>
    h('p', [
      h('a', { class: 'step-sort' }, '1. '),
      tN(msg => msg.basic.decrypt.selectText,
        {
          clickMe: h('a', { href: '#', onClick: selectCiphertext }, t(msg => msg.basic.clickMe)),
          ciphertextPrefix: boldAndItalic(t(msg => msg.basic.decrypt.ciphertextPrefix))
        }
      )
    ])
  const cipher = () => h('p', exampleProp, boldAndItalic(ciphertextExample.value))
  const alert21 = () => h('p', [
    h('a', { class: 'step-sort' }, '2.1. '),
    tN(msg => msg.basic.decrypt.rightClick1,
      {
        shortcut: boldAndItalic(t(msg => msg.basic.shortcut)),
        menuItemPath: boldAndItalic(`${t(msg => msg.app.name)} >> ${t(msg => msg.contextMenu.decrypt)}`)
      }
    )
  ])
  const alert22 = () => h('p', [
    h('a', { class: 'step-sort' }, '2.2. '),
    h('a', t(msg => msg.basic.decrypt.rightClick2))
  ])
  return () => h('div', [title(), alert1(), cipher(), alert21(), alert22()])
})

export default _default