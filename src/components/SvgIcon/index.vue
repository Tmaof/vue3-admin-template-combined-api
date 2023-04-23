<template>
  <div class="svg-icon-container">
    <!-- 处理外部svg链接,使用样式mask -->
    <div
      v-if="svgType.value == svgType.svgLink"
      class="svg-icon svg-external-icon"
      :style="svgLinkStyle"
      :class="{ 'hover-scale': props.hoverScale }"
    ></div>
    <!--处理本地svg,使用use标签 -->
    <!-- 处理图标字体类名，使用:class -->
    <svg
      v-else
      class="svg-icon"
      :class="{
        [props.icon]: svgType.value == svgType.svgClass,
        'hover-scale': props.hoverScale
      }"
    >
      <use
        :xlink:href="
          svgType.value == svgType.svgLocal ? `#icon-${props.icon}` : undefined
        "
      ></use>
    </svg>
  </div>
</template>

<script setup>
import { computed, defineProps, ref } from 'vue'

const svgType = ref({
  svgClass: 'svgClass',
  svgLink: 'svgLink',
  svgLocal: 'svgLocal',
  value: ''
})

const props = defineProps({
  icon: {
    type: String,
    required: true,
    default: ''
  },
  hoverScale: {
    type: Boolean,
    default: true
  }
})

const svgLinkStyle = computed(() => {
  const style = {
    mask: `url(${props.icon}) no-repeat 50% 50%`,
    '-webkit-mask': `url(${props.icon}) no-repeat 50% 50%`
  }
  return style
})

svgType.value.value = computed(() => {
  if (/(https?:|mailto:|tel:)/.test(props.icon)) {
    return svgType.value.svgLink
  } else if (/\bmy-/.test(props.icon)) {
    return svgType.value.svgLocal
  } else {
    // 当作 图标字体类名
    return svgType.value.svgClass
  }
})
</script>

<style scoped lang="scss">
.svg-icon-container {
  display: flex;
  justify-content: center;
  align-items: center;
  .svg-icon {
    width: 1.5em;
    height: 1.5em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }
  // 外部图标样式
  .svg-external-icon {
    background-color: currentColor;
    mask-size: cover !important;
    display: inline-block;
  }
  .hover-scale {
    &:hover {
      transform: scale(0.93);
    }
  }
}
</style>
