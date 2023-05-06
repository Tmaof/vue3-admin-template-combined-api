<template>
  <el-dialog
    :model-value="props.modelValue"
    @closed="resetExcelUpload"
    :fullscreen="getters.isMobile"
  >
    <template #header>
      <div @click="showExcelInfo = true">
        <el-icon :title="$t('AddUserDialog.index.017835-0')"><InfoFilled /></el-icon>&nbsp;<el-text
          type="primary"
          >{{ $t('AddUserDialog.index.017835-0') }}</el-text
        >
      </div>
      <el-dialog
        :model-value="showExcelInfo"
        @closed="showExcelInfo = false"
        :title="$t('AddUserDialog.index.017835-1')"
        :fullscreen="getters.isMobile"
      >
        <img src="@/assets/img/user-excel.png" fit="contain" />
        <div class="text">
          <el-text type="primary"> {{ $t('AddUserDialog.index.017835-2') }}</el-text> {{ $t('AddUserDialog.index.017835-3') }}
          <br />
          <el-text type="primary"> {{ $t('AddUserDialog.index.017835-4') }} </el-text>
          {{ $t('AddUserDialog.index.017835-5') }}
          <br />
          <el-text type="primary"> {{ $t('AddUserDialog.index.017835-6') }}</el-text> {{ $t('AddUserDialog.index.017835-7') }}
          <br />
          <el-text type="warning">{{ $t('AddUserDialog.index.017835-8') }}</el-text
          >{{ $t('AddUserDialog.index.017835-9') }}({{ $t('AddUserDialog.index.017835-10') }})
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
        <el-form-item :label="$t('AddUserDialog.index.017835-11')" prop="password">
          <el-input
            v-model="form.password"
            type="password"
            autocomplete
            show-password
          ></el-input>
        </el-form-item>
      </el-form>
      <div class="rigth-btn-container">
        <el-button type="primary" @click="onAddUser">{{ $t('AddUserDialog.index.017835-12') }}</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import i18n from '@/i18n'
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
    ElMessage.warning(i18n.$t('AddUserDialog.index.017835-13'))
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
