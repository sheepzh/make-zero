<template>
  <el-container>
    <el-aside>
      <el-menu :default-active="$route.path"
               class="menu">
        <el-menu-item @click="openMenu('/setting')"
                      index="/setting">
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
        <el-menu-item @click="openGuide()"
                      index="/guide">
          <i :class="`el-icon-notebook-1`"></i>
          <span slot="title">
            {{ $t('guide.meta.menu') }}
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
import { openGuide } from '../../zero/common/guide-opener'
export default {
  name: "PopUpMain",
  data () {
    const menu = [
      {
        title: 'version.meta.menu',
        route: '/version',
        icon: 'date'
      }
    ]
    return {
      menu
    }
  },
  methods: {
    openMenu (route) {
      if (this.$route.path !== route) {
        this.$router.push(route)
      }
    },
    openGuide () {
      openGuide()
    }
  }
}
</script>