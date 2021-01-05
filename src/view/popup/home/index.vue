<template>
  <div>
    <el-timeline>
      <el-timeline-item v-for="(v, k) in version"
                        :key="k"
                        :timestamp="v.ts||'0000-00-00'"
                        placement="top"
                        :type="v.current?'success':'primary'">
        <h5>v{{ k }}
          <el-tag class="version-item"
                  v-if="v.name"
                  :type="v.current?'success':'primary'"
                  size="mini">
            {{ v.name }}
          </el-tag>
        </h5>
        <p v-for="(tag, i) in v.contents"
           :key="i">
          <i :class="`el-icon-${icons[tag]}`" />
          <a class="version-item">{{ $t(`version.${k.replaceAll('.','_')}.${i}`) }}</a>
        </p>
      </el-timeline-item>
      <br>
      <p>
        <a><i class="el-icon-message" /></a>
        {{ mail }} &emsp;
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
<style scoped>
.version-item {
  padding-left: 4px;
}
</style>