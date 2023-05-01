<template>
  <div class="menu">
    <el-menu
      :collapse="$store.getters.isCollapseSideBar"
      router
      :unique-opened="sideBar.uniqueOpened"
      :collapse-transition="false"
    >
      <SidebarItem
        v-for="route of NewRoutes"
        :key="route.path"
        :route="route"
        parentPath=""
      >
      </SidebarItem>
    </el-menu>
  </div>
</template>

<script setup>
import { useStore } from 'vuex'
import SidebarItem from '../SidebarItem/SidebarItem.vue'
import { computed } from 'vue'
import settings from '@/settings'
const store = useStore()
const routes = store.getters.routes
const NewRoutes = computed(() => {
  const retRoutes = []
  for (const value of routes) {
    if (value.path === '/' && value.children && value.children.length) {
      // 将children中的路由记录往上提一层,方便<SidebarItem>渲染
      for (const routeItem of value.children) {
        const obj = Object.assign({}, routeItem)
        obj.path = `/${routeItem.path}`
        retRoutes.push(obj)
      }
    } else {
      retRoutes.push(value)
    }
  }

  return retRoutes
})
const { sideBar } = settings
</script>

<style scoped lang="scss"></style>
