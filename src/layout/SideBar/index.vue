<template>
  <div
    :class="{
      'sidebar-container': true,
      'sidebar-container-mobile': $store.getters.screenInfo.isMobile,
      'sidebar-container-collapse-toZero':
        $store.getters.isCollapseSideBar &&
        mobileCollapseToZero &&
        $store.getters.isMobile,
      'sidebar-container-collapse': $store.getters.isCollapseSideBar
    }"
    :style="{
      width: `${sideBarWidth}px`,
      transition: isDarging ? undefined : `width ease-in-out 0.3s`
    }"
    ref="sideBarRef"
  >
    <div class="main">
      <div class="top-logo" v-if="sideBarLogo.isShow">
        <router-link to="/">
          <h2 v-if="sideBarLogo.type === 'text'">
            {{ sideBarLogo.value }}
          </h2>
          <el-image
            v-if="sideBarLogo.type === 'img'"
            fit="contain"
            :src="sideBarLogo.value"
          ></el-image>
        </router-link>
      </div>

      <el-scrollbar>
        <SidebarMenu></SidebarMenu>
      </el-scrollbar>
    </div>
    <div
      class="darg-line"
      ref="dargLineRef"
      :style="{
        cursor: $store.getters.isCollapseSideBar ? undefined : ' e-resize'
      }"
    ></div>
  </div>
</template>

<script setup>
import settings from '@/settings'
import SidebarMenu from './SidebarMenu/SidebarMenu.vue'
import { onMounted, ref } from 'vue'
import { useStore } from 'vuex'
const store = useStore()

const {
  sideBarLogo = { isShow: false },
  minDargWidth,
  maxDargWidth,
  initWidth,
  mobileCollapseToZero
} = settings.sideBar
const dargLineRef = ref({})
const sideBarRef = ref({})
const sideBarWidth = ref(initWidth)
const isDarging = ref(false) // 拖动过程中，不需要过渡效果
function setIsCollSideBar(value) {
  store.commit('layout/SET_isCollapseSideBar', value)
}
function addDargEvent() {
  function mousemove(e) {
    let temp = sideBarWidth.value
    temp += e.movementX
    // 拖动结束，超过了允许宽度的最大，最小值
    if (temp < minDargWidth) {
      mouseup()
      setIsCollSideBar(true)
    } else if (temp > maxDargWidth) {
      mouseup()
    } else {
      sideBarWidth.value = temp
    }
  }
  function mouseup() {
    // 拖动结束后再开放选中文字。
    setTimeout(() => {
      document.onselectstart = null
    }, 1000)
    document.removeEventListener('mousemove', mousemove)
    document.removeEventListener('mouseup', mouseup)
    isDarging.value = false
  }

  function mousedown() {
    // 在拖动过程中，禁止选中文字
    document.onselectstart = function () {
      return false
    }
    isDarging.value = true
    document.addEventListener('mousemove', mousemove)
    document.addEventListener('mouseup', mouseup)
  }
  dargLineRef.value.addEventListener('mousedown', mousedown)
}
onMounted(() => {
  addDargEvent()
})
</script>

<style lang="scss" scoped>
@import '@/style/index.scss';
.sidebar-container {
  display: flex;
  position: relative;
  flex-direction: row;
  flex-shrink: 0;
  overflow: hidden;

  .main {
    flex-shrink: 1;
    flex-grow: 1;
    width: 100%;
    .top-logo {
      display: flex;
      justify-content: center;
      width: 100%;
      height: $narBarHeight;
      line-height: $narBarHeight;
      text-align: center;

      h2 {
        font-weight: bolder;
        font-size: larger;
      }
    }

    :deep(.menu) {
      .el-menu {
        border: none;
        // 主菜单
        .el-menu-item,
        .el-sub-menu__title,
        .el-sub-menu {
          font-size: $menuFontSize;
          font-weight: $menuFontWeight;
        }
      }
    }
  }

  .darg-line {
    position: absolute;
    right: 0;
    width: 10px;
    height: 100%;
  }

  &:hover .unfold-btn {
    display: inline;
  }
}

.sidebar-container-collapse {
  width: $sidebarCollapseWidth !important;
}

.sidebar-container-collapse-toZero {
  width: 0px !important;
}
.sidebar-container-collapse-toZero {
  width: 0 !important;
}
.sidebar-container-mobile {
  position: fixed;
  height: 100%;
  z-index: 999999;
}
</style>
