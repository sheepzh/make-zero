<template>
  <el-container>
    <el-aside>
      <el-menu :default-active="$route.path"
               class="menu">
        <el-menu-item @click="openMenu('/')">
          <h2>MAKE ZERO</h2>
        </el-menu-item>
        <el-menu-item v-for="({title,route,icon}) in menu"
                      :key="title"
                      :index="route"
                      @click="openMenu(route)">
          <i :class="`el-icon-${icon}`"></i>
          <span slot="title">
            {{ $t(title) }}
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
  name: "PopMain",
  data () {
    return {
      menu: [
        {
          title: 'zero.meta.menu',
          route: '/zero',
          icon: 'view'
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