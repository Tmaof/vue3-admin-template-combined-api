<template>
  <SvgIcon
    icon="my-screenfull"
    v-if="!isFull"
    @click="isFull = true"
    :hoverScale="true"
    title="全屏"
  ></SvgIcon>
  <SvgIcon
    icon="my-screenfull-no"
    :hoverScale="true"
    v-else
    @click="isFull = false"
    title="退出全屏"
  ></SvgIcon>
</template>
<script setup>
import screenfull from 'screenfull'
import { ElMessage } from 'element-plus'
import { ref, watch } from 'vue'
const isFull = ref(false)
watch(isFull, setScreenFull)
function setScreenFull(isFull) {
  if (isFull) {
    if (screenfull.isEnabled) {
      screenfull.request()
    } else {
      ElMessage.info('你的设备不支持全屏')
    }
  } else {
    screenfull.exit()
  }
}
</script>
<style lang="" scoped></style>
