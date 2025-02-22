<template>
  <div>
    <el-card shadow="never">
      <div class="head">
        <el-button
          type="primary"
          @click="isShowAddRoleDia = true"
          v-permission="'add-role'"
          >{{ $t('Role.index.017834-0') }}</el-button
        >
      </div>
      <el-table :data="roleList" border>
        <el-table-column :label="$t('Role.index.017834-1')" type="index"></el-table-column>
        <el-table-column :label="$t('Role.index.017834-2')">
          <template #default="{ row }">
            {{ row.name }}
          </template>
        </el-table-column>
        <el-table-column :label="$t('Role.index.017834-3')">
          <template #default="{ row }">
            {{ row.describe }}
          </template></el-table-column
        >
        <el-table-column :label="$t('Role.index.017834-4')">
          <template #default="{ row }">
            <el-tag v-for="(name, i) of row.names" :key="i">{{ name }}</el-tag>
          </template></el-table-column
        >
        <el-table-column :label="$t('Role.index.017834-5')" resizable>
          <template #default="{ row }">
            <el-button
              icon="Tools"
              type="primary"
              @click="onAssignPerm(row)"
              v-permission="'assign-perm'"
            >
            </el-button>
            <el-popconfirm :title="$t('Role.index.017834-6')" @confirm="deleteRoleInfo(row.id)">
              <template #reference>
                <el-button
                  icon="DeleteFilled"
                  type="danger"
                  v-permission="'delete-role'"
                ></el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 对话框 -->
    <AddRole v-model="isShowAddRoleDia" @complete="getRoleListInfo"></AddRole>
    <AssignPerm
      v-model="isShowAssignPermDia"
      :roleInfo="roleInfo"
      @complete="getRoleListInfo"
    ></AssignPerm>
  </div>
</template>

<script setup>
import { getRoleList, deleteRole } from '@/api/role-manage'
import { onMounted, ref } from 'vue'
import AddRole from './components/AddRole'
import AssignPerm from './components/AssignPerm'
const roleList = ref([])
const isShowAddRoleDia = ref(false)
const isShowAssignPermDia = ref(false)
const roleInfo = ref({})
async function getRoleListInfo() {
  roleList.value = await getRoleList()
}
/**
 * 删除角色
 */
function deleteRoleInfo(id) {
  deleteRole(id).then(() => {
    getRoleListInfo()
  })
}
/**
 * 为角色分配权限
 */
function onAssignPerm(role) {
  roleInfo.value = role
  isShowAssignPermDia.value = true
}

onMounted(() => {
  getRoleListInfo()
})
</script>

<style lang="scss" scoped>
.head {
  margin-bottom: 10px;
}
:deep(.el-tag) {
  margin: 5px;
}
</style>
