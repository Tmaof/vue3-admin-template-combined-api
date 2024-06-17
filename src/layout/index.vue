<template>
  <div
    class="layout-container"
    :class="{ 'mobile-container-global': ScreenInfo.isMobile }"
  >
    <!-- 蒙层：移动端侧边栏显示时打开蒙层 -->
    <div
      v-if="ScreenInfo.isMobile"
      class="mask"
      :class="{
        'mask-show': !$store.getters.isCollapseSideBar
      }"
      @click="setIsCollSideBar(true)"
    ></div>
    <!-- 侧边栏 -->
    <SideBar class="sidebar-container"></SideBar>
    <!-- 右侧内容区 -->
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
// 点击蒙层关闭侧边栏
function setIsCollSideBar(value) {
  store.commit('layout/SET_isCollapseSideBar', value)
}
</script>

<style scoped lang="scss">
.layout-container {
  width: 100vw;
  height: 100vh;
  display: flex;

  // 蒙层：移动端侧边栏显示时打开蒙层
  .mask {
    position: fixed;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0);
    z-index: -9999;
    transition: background 0.3s;
  }

  .mask-show {
    background: rgba(0, 0, 0, 0.8);
    z-index: 9999 !important;
  }

  .right-container {
    flex-grow: 1;
    flex-shrink: 1;
    overflow: auto;
  }
}
</style>
