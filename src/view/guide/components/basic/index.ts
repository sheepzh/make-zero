import { defineComponent, h } from "vue"
import BasicHead from './head'
import BasicEncrypt from './encrypt'
import BasicDecrypt from './decrypt'

// @see https://developer.mozilla.org/en-US/docs/Web/API/Window/find
declare global {
  interface Window {
    find: (text: string, caseSensitive?: boolean, backwards?: boolean) => boolean
  }
}

export default defineComponent({
  name: 'Basic',
  components: { BasicHead, BasicEncrypt, BasicDecrypt },
  render(_ctx: any) {
    return h('div', {}, [
      h(BasicHead),
      h(BasicEncrypt),
      h(BasicDecrypt)
    ])
  }
})