<template>
  <div>
    <el-card shadow="never">
      <div class="head">
        <el-button
          type="primary"
          v-permission="'add-perm'"
          @click="onAddPerm({ id: undefined, name: $t('Menu.index.925822-0') })"
          >{{ $t('Menu.index.925822-1') }}</el-button
        >
      </div>
      <el-table :data="permissionList" row-key="id" border>
        <el-table-column :label="$t('Menu.index.925822-2')">
          <template #default="{ row }">{{ row.name }}</template>
        </el-table-column>
        <el-table-column :label="$t('Menu.index.925822-3')">
          <template #default="{ row }">
            <el-tag :type="row.type === 1 ? '' : 'success'">{{
              row.type === 1 ? $t('Menu.index.925822-4') : $t('Menu.index.925822-5')
            }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Menu.index.925822-6')"
          ><template #default="{ row }">{{
            row.code
          }}</template></el-table-column
        >
        <el-table-column :label="$t('Menu.index.925822-7')">
          <template #default="{ row }">
            <el-button
              type="primary"
              @click="onAddPerm(row)"
              :title="$t('Menu.index.925822-8')"
              icon="Plus"
              v-permission="'add-perm'"
            ></el-button>
            <el-popconfirm @confirm="onDeletePerm(row)" :title="$t('Menu.index.925822-9')">
              <template #reference>
                <el-button
                  type="danger"
                  :title="$t('Menu.index.925822-10')"
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
import { getPermissionList, deletePermission } from '@/api/permission-manage'
const isShowAddPerm = ref(false)
const parentInfo = ref({ id: undefined, name: '' })
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
  deletePermission(perm.id).then(() => {
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
