<template>
  <el-dialog
    :model-value="props.modelValue"
    @closed="resetExcelUpload"
    :fullscreen="getters.isMobile"
  >
    <template #header>
      <div @click="showExcelInfo = true">
        <el-icon title="查看excel格式"><InfoFilled /></el-icon>&nbsp;<el-text
          type="primary"
          >查看excel格式</el-text
        >
      </div>
      <el-dialog
        :model-value="showExcelInfo"
        @closed="showExcelInfo = false"
        title="excel格式示例"
        :fullscreen="getters.isMobile"
      >
        <img src="@/assets/img/user-excel.png" fit="contain" />
        <div class="text">
          <el-text type="primary"> [姓名]</el-text> 不可重复，否则不会添加。
          <br />
          <el-text type="primary"> [角色] </el-text>
          可由中文逗号或者英文逗号分隔。角色名称如若不存在于角色列表中，则不会添加。
          <br />
          <el-text type="primary"> [开通时间]</el-text> 为可选。
          <br />
          <el-text type="warning">注意：</el-text
          >信息必须保存在第一张表格(工作簿)
        </div>
      </el-dialog>
    </template>
    <template #default>
      <UploadExcel
        ref="excelUploadRef"
        @complete="(data) => (excelData = data)"
        :reset="resetUpload"
      ></UploadExcel>
      <el-form :model="form" :rules="rules" ref="formRef">
        <el-form-item label="设置默认的登录密码" prop="password">
          <el-input
            v-model="form.password"
            type="password"
            autocomplete
            show-password
          ></el-input>
        </el-form-item>
      </el-form>
      <div class="rigth-btn-container">
        <el-button type="primary" @click="onAddUser">确定</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import UploadExcel from '@/components/UploadExcel'
import { pwdValidator } from '@/validator'
import addUserByExcel from './hooks/addUserByExcel'
import { ref, reactive, defineProps, defineEmits } from 'vue'
import { ElMessage } from 'element-plus'
import { useStore } from 'vuex'
const { getters } = useStore()
const emit = defineEmits(['complete', 'update:modelValue'])
const resetUpload = ref(false)
const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  }
})

const rules = {
  password: [
    {
      required: true,
      trigger: 'blur',
      validator: pwdValidator
    }
  ]
}
const form = reactive({
  password: ''
})
const excelUploadRef = ref()
const excelData = ref(null)
const formRef = ref()
const showExcelInfo = ref(false)
async function onAddUser() {
  if (excelData.value) {
    const isOk = await formRef.value.validate()
    if (isOk) {
      addUserByExcel(excelData.value, form.password).finally(() => {
        emit('complete')
        resetExcelUpload()
      })
    }
  } else {
    ElMessage.warning('请选择文件')
  }
}
function resetExcelUpload() {
  form.password = ''
  excelUploadRef.value.reset()
  emit('update:modelValue', false)
}
</script>

<style lang="css" scoped>
.rigth-btn-container {
  display: flex;
  justify-content: right;
}

.text {
  margin-top: 10px;
}
</style>
