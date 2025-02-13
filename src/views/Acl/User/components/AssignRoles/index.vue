<template>
  <div>
    <el-dialog
      v-model="isShow"
      :fullscreen="getters.isMobile"
      :title="$t('AssignRoles.index.017835-0')"
      @closed="resetInfo"
    >
      <div v-if="beReady">
        <el-checkbox-group v-model="selectedRolesList">
          <el-checkbox
            v-for="(role, i) of showRoleList"
            :key="i"
            :label="role"
            :checked="role.checked"
            >{{ role.name }}</el-checkbox
          >
        </el-checkbox-group>
        <div class="right-btn-container">
          <el-button type="primary" @click="assignRoles">{{ $t('AssignRoles.index.017835-1') }}</el-button>
        </div>
      </div>
      <div v-else class="loading-container">
        <el-icon :size="20" class="is-loading"><Loading /></el-icon>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import { useStore } from 'vuex'
import { defineEmits, defineProps, computed, ref, onMounted, watch } from 'vue'
import { getRoleList } from '@/api/role-manage'
import { getUserRole, assignRolesToUser } from '@/api/user-manage'
const { getters } = useStore()
const props = defineProps({
  modelValue: {
    required: true,
    defualt: false
  },
  userId: {
    required: true
  }
})
const beReady = ref(false)
const isShow = computed({
  get() {
    return props.modelValue
  },
  set(val) {
    emit('update:modelValue', val)
  }
})
const emit = defineEmits(['update:modelValue', 'complete'])
const roleList = ref([])
const userRoleList = ref([])
const selectedRolesList = ref([])
const showRoleList = ref([])

watch(props, async (props) => {
  if (props.modelValue) {
    await getRoleListInfo()
    await getUserRoleListInfo()
    getShowRoleList()
    beReady.value = true
  }
})

async function getRoleListInfo() {
  roleList.value = await getRoleList()
}
async function getUserRoleListInfo() {
  const { role } = await getUserRole(props.userId)
  userRoleList.value = role.map((item) => {
    item.checked = true
    return item
  })
}
function getShowRoleList() {
  showRoleList.value = []
  for (const item of roleList.value) {
    const index = userRoleList.value.findIndex((role) => role.id === item.id)
    if (index !== -1) {
      showRoleList.value.push(userRoleList.value[index])
    } else {
      showRoleList.value.push(item)
    }
  }
}
async function assignRoles() {
  selectedRolesList.value.forEach((item) => delete item.checked)
  await assignRolesToUser(props.userId, selectedRolesList.value).then(() => {
    isShow.value = false
    emit('complete')
  })
}

function resetInfo() {
  userRoleList.value = []
  roleList.value = []
  showRoleList.value = []
  selectedRolesList.value = []
  beReady.value = false
}
onMounted(() => {})
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
