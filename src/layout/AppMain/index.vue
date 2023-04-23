<template>
  <div
    :class="{
      'appmain-container': true,
      'appmain-container-mobile': $store.getters.screenInfo.isMobile
    }"
  >
    <router-view></router-view>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
@import '@/style/index.scss';
.appmain-container {
  height: 100vh;
  padding: $appMainPadding;
}
.appmain-container-mobile {
  margin-left: 63px;
}
</style>
