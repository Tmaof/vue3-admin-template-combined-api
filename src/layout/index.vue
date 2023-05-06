<template>
  <div
    class="layout-container"
    :class="{ 'mobile-container-global': ScreenInfo.isMobile }"
  >
    <SideBar class="sidebar-container"></SideBar>
    <div class="right-container">
      <NavBar></NavBar>
      <AppMain
        class="appmain-container dark"
        @click="dealWithCollapse"
      ></AppMain>
    </div>
  </div>
</template>

<script setup>
import AppMain from './AppMain'
import NavBar from './NavBar'
import SideBar from './SideBar'
import { watch } from 'vue'
import { useStore } from 'vuex'
import getScreenInfo from '@/utility/get-screen-info'
const ScreenInfo = getScreenInfo()
const store = useStore()
// 实时监听页面尺寸，自动收缩侧边栏
watch(
  ScreenInfo,
  (newvar, oldvar) => {
    if (newvar.isMobile) {
      store.commit('layout/SET_isCollapseSideBar', true)
    } else {
      store.commit('layout/SET_isCollapseSideBar', false)
    }
  },
  {
    immediate: true
  }
)
// 当为移动端时，点击AppMain区域的时候要关闭侧边栏
function dealWithCollapse() {
  if (store.getters.screenInfo.isMobile) {
    store.commit('layout/SET_isCollapseSideBar', true)
  }
}
</script>

<style scoped lang="scss">
.layout-container {
  width: 100vw;
  height: 100vh;
  display: flex;

  .right-container {
    flex-grow: 1;
    flex-shrink: 1;
    overflow: auto;
  }
}
</style>
