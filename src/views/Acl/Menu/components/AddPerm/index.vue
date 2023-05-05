<template>
  <div>
    <el-dialog
      v-model="isShow"
      title="添加权限"
      @closed="resInfo"
      :fullscreen="getters.isMobile"
    >
      <el-form ref="formRef" :model="form" :rules="roles">
        <el-form-item label="父权限">
          <el-input disabled :model-value="props.parentInfo.name"></el-input>
        </el-form-item>
        <el-form-item label="权限名" prop="name">
          <el-input v-model.trim="form.name"></el-input>
        </el-form-item>
        <el-form-item label="权限代码" prop="code"
          ><el-input v-model.trim="form.code"></el-input
        ></el-form-item>
        <el-form-item label="权限类型" prop="type">
          <el-select v-model="form.type">
            <el-option label="页面权限" :value="1"></el-option>
            <el-option label="按钮权限" :value="2"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div class="right-btn-container">
        <el-button type="primary" @click="addPermInfo">添加</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits, computed } from 'vue'
import { addPermission } from '@/api/permission-manage'
import { useStore } from 'vuex'
const { getters } = useStore()
const emit = defineEmits(['update:modelValue', 'complete'])
const props = defineProps({
  parentInfo: {
    required: true,
    type: Object
  },
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
const form = ref({
  pid: '',
  name: '',
  code: '',
  type: ''
})
const roles = {
  name: [{ required: true, message: '请填写权限名', trigger: 'blur' }],
  code: [{ required: true, message: '请填写权限代码', trigger: 'blur' }],
  type: [
    {
      type: 'number',
      required: true,
      message: '请选择类型',
      trigger: 'change'
    }
  ]
}
const formRef = ref()

function addPermInfo() {
  formRef.value.validate(async (ok) => {
    if (ok) {
      form.value.pid = props.parentInfo.id
      await addPermission(form.value)
      emit('complete')
      isShow.value = false
    }
  })
}

function resInfo() {
  form.value = {
    pid: '',
    name: '',
    code: '',
    type: ''
  }
}
</script>

<style scoped>
.right-btn-container {
  display: flex;
  justify-content: right;
}
</style>
