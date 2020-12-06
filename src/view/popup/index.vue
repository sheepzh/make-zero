<template>
  <el-container id="app-container">
    <el-aside id="side-menu">
      <p>
        <router-link to="/engine">
          {{ $t('engine.meta.menu') }}
        </router-link>
      </p>
      <p>
        <router-link to="/sns">
          {{ $t('sns.meta.menu') }}
        </router-link>
      </p>
    </el-aside>
    <el-container id="app-body">
      <el-header>
      </el-header>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import '../plugin/element-ui'

export default {
  name: "PopMain",
  data () {
    return {
      menuVisible: false
    }
  }
}
</script>
<style lang="scss" scoped>
#app-container {
  width: 600px;
  height: 450px;
}
#side-menu {
  width: 150px;
  height: inherit;
}
</style>