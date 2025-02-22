<template>
  <div>
    <el-dialog
      v-model="isShow"
      :title="$t('AddRole.index.017835-0')"
      @closed="resetInfo"
      :fullscreen="getters.isMobile"
    >
      <el-form ref="formRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item :label="$t('AddRole.index.017835-1')" prop="name">
          <el-input
            :placeholder="$t('AddRole.index.017835-2')"
            v-model.trim="form.name"
            @keydown.enter="addRoleInfo"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t('AddRole.index.017835-3')">
          <el-input
            :placeholder="$t('AddRole.index.017835-4')"
            v-model.trim="form.describe"
          ></el-input>
        </el-form-item>
      </el-form>
      <div class="right-btn-container">
        <el-button type="primary" @click="addRoleInfo" :loading="loading"
          >{{ $t('AddRole.index.017835-5') }}
          <template #loading>
            <el-icon><Loading /></el-icon>
          </template>
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import i18n from '@/i18n'
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
  name: '',
  describe: ''
})
const rules = {
  name: [{ required: true, message: i18n.$t('AddRole.index.017835-6'), trigger: 'blur' }]
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
