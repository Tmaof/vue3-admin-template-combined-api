<template>
  <div class="user-list-container">
    <el-card shadow="never">
      <!-- 头部 -->
      <div class="head">
        <el-button
          type="primary"
          @click="isShowDiaLog = true"
          v-permission="'excel-import'"
          >{{ $t('User.index.017834-0') }}</el-button
        >
        <el-button
          type="success"
          @click="exportExcelFile"
          loading-icon="Loading"
          :loading="exportExLoading"
          >{{ $t('User.index.017834-1') }}</el-button
        >
      </div>
      <!-- 表格 -->
      <el-table :data="userListInfo.list || []" border>
        <el-table-column type="index" :label="$t('User.index.017834-2')"></el-table-column>
        <el-table-column :label="$t('User.index.017834-3')" >
          <template v-slot="{ row }">
            <el-avatar fit="contain" :src="row.avatar">
              <SvgIcon icon="my-user"></SvgIcon>
            </el-avatar>
          </template>
        </el-table-column>
        <el-table-column :label="$t('User.index.017834-4')" >
          <template v-slot="{ row }">
            {{ row.username }}
          </template>
        </el-table-column>
        <el-table-column :label="$t('User.index.017834-5')" >
          <template v-slot="{ row }">
            <el-tag v-for="item of row.role" :key="item.id">{{
              item.name
            }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column :label="$t('User.index.017834-6')" >
          <template v-slot="{ row }">
            {{ $filters.dateFilter(row.openTime) }}
          </template>
        </el-table-column>
        <el-table-column :label="$t('User.index.017834-7')" >
          <template #default="{ row }">
            <el-button
              icon="Tools"
              type="primary"
              @click="assignRoles(row.id)"
              v-permission="'assign-role'"
            ></el-button>
            <el-popconfirm @confirm="deleteUser(row.id)" :title="$t('User.index.017834-8')">
              <template #reference>
                <el-button
                  icon="DeleteFilled"
                  type="danger"
                  v-permission="'delete-user'"
                ></el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination-container">
        <el-pagination
          :total="userListInfo.total || 0"
          :page-size="size"
          :page-sizes="pageSizes"
          v-model="page"
          layout="total,sizes, prev, pager, next, jumper"
          @current-change="onCurrentChange"
          @size-change="onSizeChange"
        />
      </div>
      <!-- 对话框组件 -->
      <AddUserDialog
        v-model="isShowDiaLog"
        @complete="getUserListInfo()"
      ></AddUserDialog>
      <AssignRoles
        v-model="isShowAssignRoles"
        :userId="currentUserId"
        @complete="getUserListInfo()"
      ></AssignRoles>
    </el-card>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { getUserList, deleteUserById } from '@/api/user-manage'
import AddUserDialog from './components/AddUserDialog'
import exportExcel from './hooks/exportExcel'
import AssignRoles from './components/AssignRoles'
const userListInfo = ref([])
const page = ref(1)
const size = ref(5)
const pageSizes = [5, 10, 20, 30, 70, 100]
const isShowDiaLog = ref(false)
const exportExLoading = ref(false)
const currentUserId = ref()
const isShowAssignRoles = ref(false)
function onCurrentChange(newPage) {
  page.value = newPage
  getUserListInfo()
}
function onSizeChange(newSize) {
  size.value = newSize
  getUserListInfo()
}
/**
 * 分页获取员工列表
 */
async function getUserListInfo() {
  userListInfo.value = await getUserList(page.value, size.value)
}
/**
 * 删除员工
 */
async function deleteUser(id) {
  await deleteUserById(id)
  getUserListInfo()
}
/**
 * excel导出
 */
async function exportExcelFile() {
  exportExLoading.value = true
  await exportExcel()
  exportExLoading.value = false
}
/**
 * 分配角色
 */
function assignRoles(id) {
  isShowAssignRoles.value = true
  currentUserId.value = id
}
onMounted(() => {
  getUserListInfo()
})
</script>

<style lang="scss" scoped>
.user-list-container {
  .head {
    margin-bottom: 10px;
  }
  .pagination-container {
    display: flex;
    justify-content: center;
    margin-top: 10px;
    :deep(.el-pagination) {
      overflow-x: auto;
    }
  }

  :deep(.el-tag) {
    margin: 5px;
  }
}
</style>
