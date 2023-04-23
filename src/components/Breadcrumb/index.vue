<template>
  <el-breadcrumb :separator="props.separator">
    <el-breadcrumb-item
      v-for="route of infoList"
      :key="route.path"
      :to="{ path: route.path }"
      >{{ route.meta.title }}</el-breadcrumb-item
    >
  </el-breadcrumb>
</template>
<script setup>
import { useRoute } from 'vue-router'
import { watch, reactive, defineProps } from 'vue'
const route = useRoute()
const infoList = reactive([])
const props = defineProps({
  separator: {
    type: String,
    default: '/'
  }
})
watch(
  route,
  () => {
    infoList.splice(0, infoList.length)
    route.matched.forEach((value) => {
      if (value.meta && value.meta.title) {
        infoList.push(value)
      }
    })
  },
  { immediate: true }
)
</script>
<style lang="" scoped></style>
