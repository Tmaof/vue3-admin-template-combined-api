<template>
  <div class="tags-view-container" v-show="routeList.length">
    <el-scrollbar>
      <div class="tags-list">
        <el-tag
          class="el-tag"
          size="large"
          closable
          v-for="route of routeList"
          :key="route.path"
          @close="onCloseTag(route)"
          @contextmenu.stop.prevent="onContextMenu($event, route)"
          :type="vueRoute.path === route.path ? 'primary' : 'info'"
        >
          <router-link :to="route.path">{{ route.title }}</router-link>
        </el-tag>
      </div>
    </el-scrollbar>
    <!-- 右键菜单 -->
    <ContextMenu
      :top="cmTop"
      :left="cmLeft"
      :visble="isShowCm"
      @refreshThePage="onRefreshThePage"
      @closeTheRightTabs="onCloseTheRightTabs"
      @closeTheOtherTabs="onCloseTheOtherTabs"
    ></ContextMenu>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { getTagsList } from './getTagsList'
import { useRoute, useRouter } from 'vue-router'
import ContextMenu from './ContextMenu'
const router = useRouter()
const isShowCm = ref(false)
const cmTop = ref('0')
const cmLeft = ref('0')
const vueRoute = useRoute()
const routeList = getTagsList(vueRoute)
let valueRoute = null
function onCloseTag(route) {
  routeList.value.splice(routeList.value.indexOf(route), 1)
}
function closeContexMenu() {
  isShowCm.value = false
  document.removeEventListener('click', closeContexMenu)
}
function onContextMenu(e, route) {
  valueRoute = route
  cmTop.value = e.y + 'px'
  cmLeft.value = e.x + 'px'
  isShowCm.value = true
  document.addEventListener('click', closeContexMenu)
}
async function onRefreshThePage() {
  await router.push(valueRoute.path)
  router.go(0)
}
function onCloseTheRightTabs() {
  const index = routeList.value.indexOf(valueRoute)
  routeList.value.splice(index + 1)
  router.push(valueRoute.path)
}
function onCloseTheOtherTabs() {
  const index = routeList.value.indexOf(valueRoute)
  routeList.value.splice(index + 1)
  routeList.value.splice(0, index)
  router.push(valueRoute.path)
}
</script>
<style lang="scss" scoped>
@import '@/style/index.scss';
.tags-view-container {
  height: $tagsVeiwHeight;
  padding: 0 10px;
  .tags-list {
    display: flex;
    margin-top: 5px;
    :deep(.el-tag) {
      margin: 0px 1px;
      border-bottom: none;
      border-top-left-radius: 10px !important;
      border-top-right-radius: 10px !important;
      border-bottom-left-radius: 0 !important;
      border-bottom-right-radius: 0 !important;
    }
  }
}
</style>
