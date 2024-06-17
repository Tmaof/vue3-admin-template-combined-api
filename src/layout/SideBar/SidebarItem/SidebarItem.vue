<template>
  <!-- 存在子路由 -->
  <el-sub-menu v-if="isShow && isHaveChild" :index="props.route.path">
    <template #title>
      <SvgIcon
        v-if="props.route.meta.icon"
        :icon="props.route.meta.icon"
      ></SvgIcon>
      <span class="menu-title">{{ getI18nValue(props.route.meta.title) }}</span>
    </template>
    <!-- 递归自己 -->
    <SidebarItem
      v-for="route of props.route.children"
      :key="route.path"
      :route="route"
      :parentPath="currentPath"
    ></SidebarItem>
  </el-sub-menu>
  <!-- 没有子路由 -->
  <el-menu-item
    v-if="isShow && !isHaveChild"
    :index="currentPath"
    @click="setIsCollSideBar"
  >
    <SvgIcon
      v-if="props.route.meta.icon"
      :icon="props.route.meta.icon"
    ></SvgIcon>
    <span class="menu-title"> {{ getI18nValue(props.route.meta.title) }} </span>
  </el-menu-item>
</template>

<script setup>
import { getI18nValue } from '@/i18n'
import { defineProps, computed } from 'vue'
import { useStore } from 'vuex'
const store = useStore()

const props = defineProps({
  route: {
    type: Object,
    required: true
  },
  // 父路由路径path
  parentPath: {
    type: String,
    required: true
  }
})
// 只显示有meta并且有meta.title字段的路由
const isShow = computed(() =>
  Boolean(props.route.meta && props.route.meta.title)
)
// 是否有子路由
const isHaveChild = computed(() =>
  Boolean(props.route.children && props.route.children.length)
)
// 当前路由路径
const currentPath = computed(() =>
  props.parentPath
    ? `${props.parentPath}/${props.route.path}`
    : `${props.route.path}`
)

// 移动端：点击菜单项时关闭侧边栏，关闭蒙层
function setIsCollSideBar() {
  if (store.getters.isMobile) {
    store.commit('layout/SET_isCollapseSideBar', true)
  }
}
</script>

<style scoped lang="scss">
.menu-title {
  margin-left: 10px;
}
</style>
