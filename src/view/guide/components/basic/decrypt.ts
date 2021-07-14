import { defineComponent, h, ref } from 'vue'
import cryptoExecutor from '../../../../service/crypto-executor'
import { CIPHER_ATTR_NAME } from '../../../../zero/dbclick'
import { t, tN } from '../../locale'
import { boldAndItalic } from '../../vue-util'

const cipherTextExample = ref('')
cryptoExecutor.encrypt(t(msg => msg.welcome)).then(cipher => cipherTextExample.value = cipher)

const selectCipherText = () => window.find(cipherTextExample.value) || window.find(cipherTextExample.value, true, true)

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
          clickMe: h('a', { href: '#', onClick: selectCipherText }, t(msg => msg.basic.clickMe)),
          cipherTextPrefix: boldAndItalic(t(msg => msg.basic.decrypt.cipherTextPrefix))
        }
      )
    ])
  const cipher = () => h('p', exampleProp, boldAndItalic(cipherTextExample.value))
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