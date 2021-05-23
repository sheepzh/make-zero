import { ElButton, ElTag, ElTimeline, ElTimelineItem, ElTooltip } from "element-plus"
import { defineComponent, h } from "vue"
import t from "../../plugin/i18n"
import copy from "../../util/copy-util"
import './style'

declare class VersionItem {
  current?: boolean
  name: string
  ts: string
  contents: ('f' | 'b')[]
}
const version: { item: VersionItem } = require('../../../../version_log.json')

const iconMap = { f: 'star-on', b: 'warning-outline' }
const email = 'returnzhy1996@outlook.com'

const key2Version = (key: string) => {
  while (key.includes('.')) {
    key = key.replace('.', '_')
  }
  return key
}

export default defineComponent({
  name: 'Version',
  setup() { },
  render() {
    const versionItems = []
    for (const [key, value] of Object.entries(version)) {
      const item = value as VersionItem

      const contents = item.contents.map(
        (tag, index) => h('p', {}, [
          h('i', { class: `el-icon-${iconMap[tag]}` }),
          h('a', { class: 'version-item' }, t(`version.${key2Version(key)}.${index}`))
        ])
      )

      versionItems.push(
        h(ElTimelineItem,
          { timestamp: item.ts || '0000-00-00', placement: 'top', type: item.current ? 'success' : 'primary' },
          () => [
            // title
            h('h5', {}, [`v${key}`, h(ElTag, { class: 'version-item', type: item.current ? 'success' : 'primary', size: 'mini' }, () => item.name)]),
            // contents
            ...contents
          ]
        )
      )
    }
    return h(ElTimeline, {},
      () => [
        ...versionItems,
        h('br'),
        h('p', {}, [
          h('a', {}, h('i', { class: 'el-icon-message' })),
          ` ${email} `,
          h(ElTooltip, { content: t('button.copy') }, () => h(ElButton, { icon: 'el-icon-copy-document', type: 'primary', size: 'mini', circle: true, onClick: () => copy(email) }))
        ])
      ]
    )
  }
})