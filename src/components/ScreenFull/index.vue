<template>
  <SvgIcon
    icon="my-screenfull"
    v-if="!isFull"
    @click="isFull = true"
    :hoverScale="true"
    :title="$t('ScreenFull.index.268236-0')"
  ></SvgIcon>
  <SvgIcon
    icon="my-screenfull-no"
    :hoverScale="true"
    v-else
    @click="isFull = false"
    :title="$t('ScreenFull.index.268236-1')"
  ></SvgIcon>
</template>
<script setup>
import screenfull from 'screenfull'
import { ElMessage } from 'element-plus'
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
const i18n = useI18n()
const isFull = ref(false)
watch(isFull, setScreenFull)
function setScreenFull(isFull) {
  if (isFull) {
    if (screenfull.isEnabled) {
      screenfull.request()
    } else {
      ElMessage.info(i18n.t('ScreenFull.index.268236-2'))
    }
  } else {
    screenfull.exit()
  }
}
</script>
<style lang="" scoped></style>
