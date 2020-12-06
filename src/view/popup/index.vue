<template>
  <div id="app">
    <el-container>
      <el-aside>
      </el-aside>
      <el-container>
        <el-header>
        </el-header>
        <el-main>
          <FilterSetting />
          <ZeroSetting />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import '../plugin/element-ui'
import FilterSetting from "./engine/index"
import ZeroSetting from './sns-zero/index'

export default {
  name: "PopMain",
  components: { FilterSetting, ZeroSetting },
  data () {
    return {
      menuVisible: false
    }
  }
}
</script>
<style lang="scss" scoped>
#app {
  width: 800px !important;
  max-height: 500px;
}
</style>