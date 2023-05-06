<template>
  <div>
    <el-dialog
      v-model="isShow"
      :title="$t('AddPerm.index.017835-0')"
      @closed="resInfo"
      :fullscreen="getters.isMobile"
    >
      <el-form ref="formRef" :model="form" :rules="roles">
        <el-form-item :label="$t('AddPerm.index.017835-1')">
          <el-input disabled :model-value="props.parentInfo.name"></el-input>
        </el-form-item>
        <el-form-item :label="$t('AddPerm.index.017835-2')" prop="name">
          <el-input v-model.trim="form.name"></el-input>
        </el-form-item>
        <el-form-item :label="$t('AddPerm.index.017835-3')" prop="code"
          ><el-input v-model.trim="form.code"></el-input
        ></el-form-item>
        <el-form-item :label="$t('AddPerm.index.017835-4')" prop="type">
          <el-select v-model="form.type">
            <el-option :label="$t('AddPerm.index.017835-5')" :value="1"></el-option>
            <el-option :label="$t('AddPerm.index.017835-6')" :value="2"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div class="right-btn-container">
        <el-button type="primary" @click="addPermInfo">{{ $t('AddPerm.index.017835-7') }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import i18n from '@/i18n'
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
  name: [{ required: true, message: i18n.$t('AddPerm.index.017835-8'), trigger: 'blur' }],
  code: [{ required: true, message: i18n.$t('AddPerm.index.017835-9'), trigger: 'blur' }],
  type: [
    {
      type: 'number',
      required: true,
      message: i18n.$t('AddPerm.index.017835-10'),
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
