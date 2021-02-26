<template>
  <el-container>
    <el-aside>
      <el-menu :default-active="$route.path"
               class="menu">
        <el-menu-item v-for="({title,route}, index) in menu"
                      :key="title"
                      :index="route"
                      @click="openMenu(route)">
          <span slot="title">
            {{ (index + 1) + '. ' + $t(title) }}
          </span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container id="app-body">
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {
  name: 'AppMain',
  mounted () {
    document.title = this.$t('guide.meta.title')
  },
  data () {
    return {
      menu: [
        {
          title: 'guide.basic.title',
          route: '/basic'
        }, {
          title: 'guide.autoEncryption.title',
          route: '/auto-encryption'
        }, {
          title: 'guide.autoDecryption.title',
          route: '/auto-decryption'
        }
      ]
    }
  },
  methods: {
    openMenu (route) {
      if (this.$route.path !== route) {
        this.$router.push(route)
      }
    }
  }
}
</script>
<style scoped>
.el-container {
  min-height: 400px;
}
</style>