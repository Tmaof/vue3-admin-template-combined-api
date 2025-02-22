<template>
  <div>
    <el-dialog
      :fullscreen="getters.isMobile"
      v-model="isShow"
      :title="$t('AssignPerm.index.017835-0', [props.roleInfo.name || '角色'])"
      @closed="resetInfo"
    >
      <div v-if="!isLoading">
        <el-tree
          :check-strictly="true"
          ref="elTreeRef"
          :data="permList"
          show-checkbox
          node-key="id"
          highlight-current
          :props="elTreeProps"
          :default-checked-keys="defaultCheckedIds"
          :default-expanded-keys="defaultCheckedIds"
        />
        <div class="right-btn-container">
          <el-button type="primary" @click="onAssignPerm">{{ $t('AssignPerm.index.017835-1') }}</el-button>
        </div>
      </div>
      <div v-else class="loading-container">
        <el-icon class="is-loading" size="20"><Loading /></el-icon>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import { getRolePermission, assignPermission } from '@/api/role-manage'
import { ref, defineProps, computed, defineEmits, watch } from 'vue'
import { useStore } from 'vuex'
const { getters } = useStore()
const permList = ref([])
const defaultCheckedIds = ref([])
const props = defineProps({
  modelValue: {
    required: true,
    type: Boolean
  },
  roleInfo: {
    required: true,
    type: Object
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
const elTreeProps = {
  children: 'children',
  label: 'name'
}
const elTreeRef = ref()
const isLoading = ref(true)

watch(props, async (props) => {
  if (props.modelValue) {
    isLoading.value = true
    await getPermListInfo(props.roleInfo.id)
    isLoading.value = false
  }
})

/**
 * 获取角色的权限
 * @param {*} id
 */
async function getPermListInfo(id) {
  const info = await getRolePermission(id)
  defaultCheckedIds.value = info.selected
  permList.value = info.list
}
/**
 * 分配权限
 */
async function onAssignPerm() {
  const list = elTreeRef.value.getCheckedKeys()
  assignPermission({ roleId: props.roleInfo.id, permissionIdList: list }).then(() => {
    isShow.value = false
    emit('complete')
  })
}
function resetInfo() {
  permList.value = []
  defaultCheckedIds.value = []
}
</script>

<style scoped>
.right-btn-container {
  display: flex;
  justify-content: right;
}
.loading-container {
  display: flex;
  justify-content: center;
}
</style>
