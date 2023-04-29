<template>
  <el-dropdown trigger="hover" @command="(value) => $emit('langChange', value)">
    <SvgIcon icon="my-language"></SvgIcon>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item
          v-for="item in props.langList"
          :key="item.value"
          :command="item.value"
          >{{ item.label }}</el-dropdown-item
        >
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup>
import { defineProps } from 'vue'
const props = defineProps({
  langList: {
    required: true
  }
})
</script>

<style lang="scss" scoped></style>
