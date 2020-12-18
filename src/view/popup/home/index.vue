<template>
  <div>
    <el-timeline>
      <el-timeline-item v-for="(v, k) in version"
                        :key="k"
                        :timestamp="`v${k}  ${v.ts}`"
                        placement="top"
                        :type="v.current?'success':'primary'">
        <!-- <el-card> -->
        <p v-for="(tag, i) in v.contents"
           :key="i">
          <i :class="`el-icon-${icons[tag]}`" />&emsp;{{$t(`version.${k.replaceAll('.','_')}.${i}`)}}
        </p>
        <!-- </el-card> -->
      </el-timeline-item>
      <br>
      <p><i class="el-icon-message" />&emsp;returnzhy1996@outlook.com</p>
    </el-timeline>
  </div>
</template>
<script>
const version = require('../../../../version_log.json')

export default {
  name: 'Home',
  data () {
    return {
      icons: { f: 'star-on', b: 'warning-outline' },
      version
    }
  }
}
</script>