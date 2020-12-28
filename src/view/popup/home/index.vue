<template>
  <div>
    <el-timeline>
      <el-timeline-item v-for="(v, k) in version"
                        :key="k"
                        :timestamp="`v${k}  ${v.ts}`"
                        placement="top"
                        :type="v.current?'success':'primary'">
        <p v-for="(tag, i) in v.contents"
           :key="i">
          <i :class="`el-icon-${icons[tag]}`" />&emsp;{{$t(`version.${k.replaceAll('.','_')}.${i}`)}}
        </p>
      </el-timeline-item>
      <br>
      <p>
        <a><i class="el-icon-message" /></a>
        {{ mail }}
        <el-tooltip :content="$t('button.copy')">
          <el-button icon="el-icon-copy-document"
                     @click="copyMail()"
                     type="primary"
                     circle
                     size="mini" />
        </el-tooltip>
      </p>
    </el-timeline>
  </div>
</template>
<script>
const version = require('../../../../version_log.json')
import copy from '../../util/copy-util'

export default {
  name: 'Home',
  data () {
    return {
      icons: { f: 'star-on', b: 'warning-outline' },
      version,
      mail: 'returnzhy1996@outlook.com'
    }
  },
  methods: {
    copyMail () {
      copy(this.mail, this)
    }
  }
}
</script>