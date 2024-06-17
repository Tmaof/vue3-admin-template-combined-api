<template>
  <div class="content-menu-container" :style="style" v-show="visble">
    <el-card body-class="el-card" :body-style="{ padding: '10px 0' }">
      <ul>
        <li @click="emitEvent('refreshThePage')">
          <SvgIcon icon="my-shuaxin"></SvgIcon
          ><span>{{ $t('ContextMenu.index.322055-0') }}</span>
        </li>
        <li @click="emitEvent('closeTheRightTabs')">
          <SvgIcon icon="my-toright"></SvgIcon
          ><span>{{ $t('ContextMenu.index.322055-1') }}</span>
        </li>
        <li @click="emitEvent('closeTheOtherTabs')">
          <SvgIcon icon="my-guanbi"></SvgIcon
          ><span>{{ $t('ContextMenu.index.322055-2') }}</span>
        </li>
      </ul>
    </el-card>
  </div>
</template>
<script setup>
import { computed, defineProps, defineEmits } from 'vue'
const emit = defineEmits([
  'refreshThePage',
  'closeTheRightTabs',
  'closeTheOtherTabs'
])
function emitEvent(name) {
  emit(name)
}
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
  .el-card {
    border-radius: 10px;
    ul > li {
      display: flex;
      justify-content: flex-start;
      padding: 5px 15px;
      cursor: default;
      font-size: small;

      span {
        margin-left: 5px;
      }
    }
  }
}
</style>
