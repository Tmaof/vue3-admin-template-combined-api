<template>
  <SvgIcon v-if="isDark" icon="my-sun" @click="toggleDark(false)"></SvgIcon>
  <SvgIcon v-else icon="my-moon" @click="toggleDark(true)"></SvgIcon>
</template>

<script setup>
import { useDark, useToggle } from '@vueuse/core'
import { defineProps } from 'vue'
const props = defineProps({
  normalMode: {
    type: Boolean,
    default: true
  }
})
const isDark = useDark({
  selector: 'html', // 要为哪一个元素添加属性，默认添加的属性名为class。element-plus的drak类必须添加在html标签上
  valueDark: props.normalMode
    ? 'theme-dark dark'
    : 'theme-filter-invert-light theme-filter-invert-dark', // 添加的属性值,drak是 element-plus 的暗夜样式的类（https://element-plus.gitee.io/zh-CN/guide/dark-mode.html）
  valueLight: props.normalMode ? 'theme-light' : 'theme-filter-invert-light'
})
const toggleDark = useToggle(isDark)
</script>

<style></style>
