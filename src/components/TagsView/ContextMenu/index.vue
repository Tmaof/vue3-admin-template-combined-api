<template>
  <div class="content-menu-container" :style="style" v-show="visble">
    <el-card :body-style="{ padding: '10px 0' }" shadow="never">
      <ul>
        <li @click="this.$emit('refreshThePage')">刷新页面</li>
        <li @click="this.$emit('closeTheRightTabs')">关闭右侧选项卡</li>
        <li @click="this.$emit('closeTheOtherTabs')">关闭其他选项卡</li>
      </ul>
    </el-card>
  </div>
</template>
<script setup>
import { computed, defineProps } from 'vue'

const props = defineProps({
  visble: {
    required: true,
    type: Boolean
  },
  left: {
    required: true,
    type: String
  },
  top: {
    required: true,
    type: String
  }
})
const style = computed(() => {
  return {
    top: props.top,
    left: props.left
  }
})
</script>
<style lang="scss" scoped>
.content-menu-container {
  display: block;
  position: fixed;

  ul > li {
    padding: 5px 30px;
    cursor: default;
    font-size: small;
    &:hover {
      background-color: rgba(176, 173, 173, 0.15);
    }
  }
}
</style>
