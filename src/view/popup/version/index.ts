import { ElButton, ElTag, ElTimeline, ElTimelineItem, ElTooltip } from "element-plus"
import { defineComponent, h } from "vue"
import copy from "../copy-util"
import './style'

import version, { ContentType } from '../../../version-log'
import { t } from "../locale"

const iconMap: Map<ContentType, string> = new Map()
iconMap.set('f', 'star-on')
iconMap.set('b', 'warning-outline')

const email = 'returnzhy1996@outlook.com'

const key2Version = (key: string) => key.split('.').join('_')

export default defineComponent<{}, {}>(() => {
  const versionItems = []
  for (const [key, item] of Object.entries(version)) {
    const contents = item.contents.map(
      (tag, index) => h('p', [
        h('i', { class: `el-icon-${iconMap.get(tag)}` }),
        h('a', { class: 'version-item' }, t(msg => msg.version[key2Version(key)][index]))
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
  return () => h(ElTimeline, () => [
    ...versionItems,
    h('br'),
    h('p', {}, [
      h('a', {}, h('i', { class: 'el-icon-message' })),
      ` ${email} `,
      h(ElTooltip, { content: t(msg => msg.button.copy) }, () => h(ElButton, { icon: 'el-icon-copy-document', type: 'primary', size: 'mini', circle: true, onClick: () => copy(email) }))
    ])
  ])
})