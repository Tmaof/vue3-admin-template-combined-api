<template>
  <div>
    <el-dialog
      v-model="isShow"
      title="添加角色"
      @closed="resetInfo"
      :fullscreen="getters.isMobile"
    >
      <el-form ref="formRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="角色名" prop="title">
          <el-input
            placeholder="请填写角色名"
            v-model.trim="form.title"
            @keydown.enter="addRoleInfo"
          ></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input
            placeholder="请填写描述"
            v-model.trim="form.describe"
          ></el-input>
        </el-form-item>
      </el-form>
      <div class="right-btn-container">
        <el-button type="primary" @click="addRoleInfo" :loading="loading"
          >添加
          <template #loading>
            <el-icon><Loading /></el-icon>
          </template>
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import { defineEmits, defineProps, computed, ref } from 'vue'
import { addRole } from '@/api/role-manage'
import { useStore } from 'vuex'
const { getters } = useStore()
const props = defineProps({
  modelValue: {
    required: true,
    type: Boolean
  }
})
const isShow = computed({
  get() {
    return props.modelValue
  },
  set(val) {
    emit('update:modelValue', val)
  }
})
const emit = defineEmits(['update:modelValue', 'complete'])
const form = ref({
  title: '',
  describe: ''
})
const rules = {
  title: [{ required: true, message: '请输入角色名', trigger: 'blur' }]
}
const formRef = ref()
const loading = ref(false)
function resetInfo() {
  form.value = {}
}

async function addRoleInfo() {
  loading.value = true

  formRef.value.validate((ok) => {
    if (ok) {
      addRole(form.value).then(() => {
        isShow.value = false
        emit('complete')
      })
    }
    loading.value = false
  })
}
</script>

<style scoped>
.right-btn-container {
  display: flex;
  justify-content: right;
}
</style>
