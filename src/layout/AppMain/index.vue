<template>
  <div
    :class="{
      'appmain-container': true,
      'appmain-container-mobile': $store.getters.screenInfo.isMobile,
      'appmain-container-margin-left-mobile':
        $store.getters.screenInfo.isMobile && mobileCollapseToZero
    }"
  >
    <router-view v-slot="{ Component, route }">
      <transition mode="out-in" appear
        ><keep-alive>
          <component :is="Component" :key="route.path" />
        </keep-alive>
      </transition>
    </router-view>
  </div>
</template>

<script setup>
import settings from '@/settings'
const { mobileCollapseToZero } = settings.sideBar
</script>

<style lang="scss" scoped>
@import '@/style/index.scss';
.v-enter-active,
.v-leave-active {
  transition: all 0.5s ease;
}
.v-leave-to,
.v-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}
.v-leave-from,
.v-enter-to {
  transform: translateX(0px);
}

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
