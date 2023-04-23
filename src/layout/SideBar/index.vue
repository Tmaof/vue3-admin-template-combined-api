<template>
  <div
    :class="{
      'sidebar-container': true,
      'sidebar-container-mobile': $store.getters.screenInfo.isMobile,
      'sidebar-container-collapse': $store.getters.isCollapseSideBar
    }"
  >
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
</template>

<script setup>
import settings from '@/settings'
import SidebarMenu from './SidebarMenu/SidebarMenu.vue'
const { sideBarLogo = { isShow: false } } = settings.sideBar
</script>

<style lang="scss" scoped>
@import '@/style/index.scss';
.sidebar-container {
  width: $sideBarWidth;
  overflow: hidden;
  transition: width ease-in-out 0.3s;
  .top-logo {
    display: flex;
    justify-content: center;
    height: $narBarHeight;
    width: $sideBarWidth;
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

.sidebar-container-collapse {
  width: 64px !important;

  .top-logo {
    opacity: 0;
  }
}

.sidebar-container-mobile {
  position: fixed;
  height: 100%;
  top: $narBarHeight - 1px;
}
</style>
