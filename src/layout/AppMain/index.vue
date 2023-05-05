<template>
  <div
    :class="{
      'appmain-container': true,
      'appmain-margin-left-mobile':
        $store.getters.screenInfo.isMobile && !mobileCollapseToZero,
      'appmain-container-mobile': $store.getters.screenInfo.isMobile
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
.appmain-margin-left-mobile {
  margin-left: $sidebarCollapseWidth - 1px;
}

.appmain-container-mobile {
  padding: $appMainPaddingMobile;
}
</style>
