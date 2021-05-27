import { defineComponent, h, reactive, ref } from 'vue'
import cryptionExcutor from '../../../../service/cryption-excutor'
import { CIPHER_ATTR_NAME } from '../../../../zero/dbclick'
import { t, tN } from '../../../plugin/i18n'
import { boldAndItalic } from '../../../util/vue-util'

const ciphertextExample = ref('')
cryptionExcutor.encrypt(t('guide.welcome')).then(cipher => ciphertextExample.value = cipher)

const selectCiphertext = () => window.find(ciphertextExample.value) || window.find(ciphertextExample.value, true, true)

/**
 * How to decrypt
 */
const _default = defineComponent(() => {
  // title
  const title = () => h('h3', t('guide.basic.decrypt.title'))
  // step 1
  const exampleProp = { style: 'text-indent:2em;' }
  exampleProp[CIPHER_ATTR_NAME] = true
  const alert1 = () =>
    h('p', [
      h('a', { class: 'step-sort' }, '1. '),
      tN('guide.basic.decrypt.selectText',
        {
          clickMe: h('a', { href: '#', onClick: selectCiphertext }, t('guide.basic.clickMe')),
          ciphertextPrefix: boldAndItalic(t('guide.basic.decrypt.ciphertextPrefix'))
        }
      )
    ])
  const cipher = () => h('p', exampleProp, boldAndItalic(ciphertextExample.value))
  const alert21 = () => h('p', [
    h('a', { class: 'step-sort' }, '2.1. '),
    tN('guide.basic.decrypt.rightClick1',
      {
        shortcut: boldAndItalic(t('guide.basic.shortcut')),
        menuItemPath: boldAndItalic(`${t('app.name')} >> ${t('contextMenu.decrypt')}`)
      }
    )
  ])
  const alert22 = () => h('p', [
    h('a', { class: 'step-sort' }, '2.2. '),
    h('a', t('guide.basic.decrypt.rightClick2'))
  ])
  return () => h('div', [title(), alert1(), cipher(), alert21(), alert22()])
})

export default _default