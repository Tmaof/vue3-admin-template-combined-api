<template>
  <div class="info-container">
    <el-card shadow="never">
      <el-form>
        <el-form-item :label="$t('Info.index.017834-0')">
          <el-button type="primary" @click="resetDb(true)" size="small"
            >{{ $t('Info.index.017834-1') }}</el-button
          >
        </el-form-item>
        <el-form-item
          :label="$t('Info.index.017834-2')"
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
