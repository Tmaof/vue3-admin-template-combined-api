<template>
  <div
    :class="{
      'appmain-container': true,
      'appmain-container-mobile': $store.getters.screenInfo.isMobile
    }"
  >
    <router-view v-slot="{ Component, route }">
      <transition mode="out-in"
        ><keep-alive>
          <component :is="Component" :key="route.path" />
        </keep-alive>
      </transition>
    </router-view>
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
