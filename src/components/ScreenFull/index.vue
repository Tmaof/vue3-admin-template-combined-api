<template>
  <SvgIcon
    icon="my-screenfull"
    v-if="!isFull"
    @click="isFull = true"
    :hoverScale="true"
    :title="$t('ScreenFull.index.808363-0')"
  ></SvgIcon>
  <SvgIcon
    icon="my-screenfull-no"
    :hoverScale="true"
    v-else
    @click="isFull = false"
    :title="$t('ScreenFull.index.808363-1')"
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
      ElMessage.info(this.$t('ScreenFull.index.808363-2'))
    }
  } else {
    screenfull.exit()
  }
}
</script>
<style lang="" scoped></style>
