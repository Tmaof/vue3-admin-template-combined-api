<template>
  <div class="info-container">
    <el-card shadow="never">
      <el-form>
        <el-form-item label="你可以点击右侧的重置按钮来重置数据">
          <el-button type="primary" @click="resetDb(true)" size="small"
            >重置</el-button
          >
        </el-form-item>
        <el-form-item
          label="当员工数据为空时，刷新页面会自动重置数据"
        ></el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { resetDb } from '@/mock/IndexedDB'
</script>

<style scoped>
.info-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
