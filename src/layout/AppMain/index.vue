<template>
  <div
    :class="{
      'appmain-container': true,
      'appmain-container-mobile': $store.getters.screenInfo.isMobile,
      'appmain-container-margin-left-mobile':
        $store.getters.screenInfo.isMobile && mobileCollapseToZero
    }"
  >
    <router-view></router-view>
  </div>
</template>

<script setup>
import settings from '@/settings'
const { mobileCollapseToZero } = settings.sideBar
</script>

<style lang="scss" scoped>
@import '@/style/index.scss';
.appmain-container {
  min-height: 100vh;
  padding: $appMainPadding;
}
.appmain-container-margin-left-mobile {
  margin-left: 0px !important;
}
.appmain-container-mobile {
  margin-left: 63px;
  padding: $appMainPadding-mobile;
}
</style>
