<template>
  <div class="upload">
    <el-upload
      accept=".xlsx, .xls, .csv"
      drag
      action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
      :before-upload="beforeUpload"
      :http-request="() => false"
      :file-list="fileIist"
    >
      <template #default>
        <el-icon class="el-icon--upload" v-if="isComplete" color=" #95d475">
          <SuccessFilled />
        </el-icon>
        <el-icon class="el-icon--upload is-loading" v-else-if="isLoading">
          <Loading />
        </el-icon>
        <el-icon class="el-icon--upload" v-else>
          <upload-filled />
        </el-icon>
        <div class="el-upload__text">{{ $t('UploadExcel.index.017837-0') }} <em>{{ $t('UploadExcel.index.017837-1') }}</em></div>
      </template>
      <template #file="data">
        <el-card shadow="never">
          <div>
            <el-text type="success">{{ $t('UploadExcel.index.017837-2') }}&nbsp;{{ data.file.name }}</el-text>
          </div>
          <div>
            <el-text type="success"
              >{{ $t('UploadExcel.index.017837-3') }}&nbsp;{{ parseInt(data.file.size / 1024) }}kb</el-text
            >
          </div>
        </el-card>
      </template>
      <template #tip>
        <div class="el-upload__tip">{{ $t('UploadExcel.index.017837-4') }}</div>
      </template>
    </el-upload>
  </div>
</template>

<script setup>
import { parseExcel, isExcel } from './utility'
import { defineEmits, ref, defineExpose } from 'vue'
import { ElMessage } from 'element-plus'
defineExpose({
  reset
})
const isComplete = ref(false)
const isLoading = ref(false)
const emit = defineEmits(['complete'])
const fileIist = ref([])

async function beforeUpload(file) {
  if (isExcel(file)) {
    isLoading.value = true
    fileIist.value = [file]
    const data = await parseExcel(file)
    emit('complete', data)
    isComplete.value = true
    isLoading.value = false
    return true
  } else {
    ElMessage.warning(this.$t('UploadExcel.index.017837-4'))
    return false
  }
}

function reset() {
  fileIist.value = []
  isComplete.value = false
}
</script>

<style lang="scss" scoped></style>
