<template>
  <div>
    <el-card shadow="never">
      <div class="head">
        <el-button
          type="primary"
          v-permission="'add-root-perm'"
          @click="onAddPerm({ id: '1', name: '您正在添加根权限' })"
          >添加根权限</el-button
        >
      </div>
      <el-table :data="permissionList" row-key="id" border>
        <el-table-column label="权限名">
          <template #default="{ row }">{{ row.name }}</template>
        </el-table-column>
        <el-table-column label="权限类型">
          <template #default="{ row }">
            <el-tag :type="row.type === 1 ? '' : 'success'">{{
              row.type === 1 ? '页面权限' : '按钮权限'
            }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="权限代码"
          ><template #default="{ row }">{{
            row.code
          }}</template></el-table-column
        >
        <el-table-column label="操作">
          <template #default="{ row }">
            <el-button
              type="primary"
              @click="onAddPerm(row)"
              title="添加子权限"
              icon="Plus"
              v-permission="'add-children-perm'"
            ></el-button>
            <el-popconfirm @confirm="onDeletePerm(row)" title="确定删除吗">
              <template #reference>
                <el-button
                  type="danger"
                  title="删除"
                  icon="Delete"
                  v-permission="'delete-perm'"
                ></el-button
              ></template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 对话框 -->
    <AddPerm
      v-model="isShowAddPerm"
      :parentInfo="parentInfo"
      @complete="getPermissionListInfo"
    ></AddPerm>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import AddPerm from './components/AddPerm'
import { getPermissionList, deletePermssion } from '@/api/permission-manage'
const isShowAddPerm = ref(false)
const parentInfo = ref({ id: '1', name: '' })
const permissionList = ref()
/**
 * 添加权限
 */
function onAddPerm(parentPerm) {
  isShowAddPerm.value = true
  parentInfo.value.id = parentPerm.id
  parentInfo.value.name = parentPerm.name
}

/**
 * 获取权限列表
 */
async function getPermissionListInfo() {
  permissionList.value = await getPermissionList()
}

/**
 * 删除权限
 */
async function onDeletePerm(perm) {
  deletePermssion(perm).then(() => {
    getPermissionListInfo()
  })
}
onMounted(() => {
  getPermissionListInfo()
})
</script>

<style lang="scss" scoped>
.head {
  margin-bottom: 10px;
}
</style>
