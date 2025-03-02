<template>
    <div class="user-log-container">
        <el-card shadow="never">
            <!-- 查询部分 -->
            <div class="search-section">
                <h3 class="section-title">查询条件</h3>
                <el-form :inline="false" :model="searchForm">
                    <el-form-item label="用户">
                        <el-select
                            v-model="searchForm.userId"
                            placeholder="请选择用户"
                            clearable
                            filterable
                            :filter-method="filterUsers"
                            remote
                            reserve-keyword
                        >
                            <el-option
                                v-for="user in filteredUserList"
                                :key="user.id"
                                :label="user.username"
                                :value="user.id"
                            >
                                <div class="user-option">
                                    <el-avatar :size="24" :src="user.avatar" />
                                    <span>{{ user.username }}</span>
                                    <span class="user-id">(ID: {{ user.id }})</span>
                                </div>
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="查询时间">
                        <el-date-picker style="max-width: 320px" v-model="searchForm.timeRange" type="datetimerange" range-separator="至"
                            start-placeholder="开始时间" end-placeholder="结束时间" format="YYYY-MM-DD HH:mm:ss"
                            value-format="YYYY-MM-DD HH:mm:ss" />
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="handleSearch">查询</el-button>
                        <el-button @click="handleReset">重置</el-button>
                    </el-form-item>
                </el-form>
            </div>

            <!-- 删除部分 -->
            <div class="delete-section">
                <h3 class="section-title">批量删除</h3>
                <div class="delete-form">
                    <el-date-picker v-model="deleteTimeRange" type="datetimerange" range-separator="至"
                        start-placeholder="删除开始时间" end-placeholder="删除结束时间" format="YYYY-MM-DD HH:mm:ss"
                        value-format="YYYY-MM-DD HH:mm:ss" style="max-width: 320px" />
                    <el-button type="danger" @click="handleDelete" v-permission="'delete-user-log'">删除选中时间段日志</el-button>
                </div>
            </div>

            <el-table :data="logList" border style="width: 100%" v-loading="loading" @sort-change="handleSortChange" :default-sort="{ prop: 'time', order: 'descending' }">
                <el-table-column prop="id" label="ID" width="80" />
                <el-table-column label="用户信息" width="200">
                    <template #default="{ row }">
                        <div class="user-info">
                            <el-avatar :size="32" :src="row.user?.avatar" />
                            <span>{{ row.user?.username }} (ID: {{ row.user?.id }})</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="path" label="请求路径" show-overflow-tooltip />
                <el-table-column prop="methods" label="请求方法" width="100" />
                <el-table-column prop="ip" label="IP地址" width="150" />
                <el-table-column prop="time" label="请求时间" width="180" sortable="custom">
                    <template #default="{ row }">
                        {{ formatDateTime(row.time) }}
                    </template>
                </el-table-column>
                <el-table-column prop="handeTime" label="处理时长(ms)" width="120" />
                <el-table-column label="详情" width="80" fixed="right">
                    <template #default="scope">
                        <el-button link type="primary" @click="showDetail(scope.row)">查看</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <div class="pagination">
                <el-pagination
                v-model="page"
                :page-size="size"
                :page-sizes="pageSizes"
                layout="total,sizes, prev, pager, next, jumper"
                :total="total"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange" />
            </div>
        </el-card>

        <!-- 详情对话框 -->
        <el-dialog v-model="dialogVisible" title="日志详情" width="60%" :fullscreen="getters.isMobile">
            <el-descriptions label-align='left' :column="1" border label-width='30'>
                <el-descriptions-item label="用户信息">
                    <div class="user-info">
                        <el-avatar :size="32" :src="currentLog.user?.avatar" />
                        <span>{{ currentLog.user?.username }} (ID: {{ currentLog.user?.id }})</span>
                    </div>
                </el-descriptions-item>
                <el-descriptions-item label="请求头">
                    <vue-json-pretty
                        :data="parseJson(currentLog.reqHeader)"
                        :deep="2"
                        :show-double-quotes="true"
                        :show-length="true"
                        :collapsed-level="2"
                        :show-line="true"
                        :show-line-number="true"
                        path="root"
                        class="json-viewer"
                    />
                </el-descriptions-item>
                <el-descriptions-item label="请求体">
                    <vue-json-pretty
                        :data="parseJson(currentLog.reqBody)"
                        :deep="2"
                        :show-double-quotes="true"
                        :show-length="true"
                        :collapsed-level="2"
                        :show-line="true"
                        :show-line-number="true"
                        path="root"
                        class="json-viewer"
                    />
                </el-descriptions-item>
                <el-descriptions-item label="请求参数">
                    <vue-json-pretty
                        :data="parseJson(currentLog.reqQuery)"
                        :deep="2"
                        :show-double-quotes="true"
                        :show-length="true"
                        :collapsed-level="2"
                        :show-line="true"
                        :show-line-number="true"
                        path="root"
                        class="json-viewer"
                    />
                </el-descriptions-item>
                <el-descriptions-item label="响应数据">
                    <vue-json-pretty
                        :data="parseJson(currentLog.resBody)"
                        :deep="2"
                        :show-double-quotes="true"
                        :show-length="true"
                        :collapsed-level="2"
                        :show-line="true"
                        :show-line-number="true"
                        path="root"
                        class="json-viewer"
                    />
                </el-descriptions-item>
            </el-descriptions>
        </el-dialog>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getUserLogs, deleteUserLogsByTimeRange } from '@/api/user-log'
import { getUserListAll } from '@/api/user-manage'
import { ElMessage, ElMessageBox } from 'element-plus'
import VueJsonPretty from 'vue-json-pretty'
import 'vue-json-pretty/lib/styles.css'
import { useStore } from 'vuex'
const { getters } = useStore()

const loading = ref(false)
const logList = ref([])
const page = ref(1)
const size = ref(5)
const pageSizes = [5, 10, 20, 30, 70, 100]
const total = ref(0)
const dialogVisible = ref(false)
const currentLog = ref({})
const deleteTimeRange = ref([])
const sortConfig = ref({
  prop: 'time', // 默认按时间排序
  order: 'descending' // 默认降序（最新的在前面）
})

// 用户列表相关
const userList = ref([])
const filteredUserList = ref([])

const searchForm = ref({
  userId: null,
  timeRange: []
})

// 获取日志列表
const getList = async () => {
  loading.value = true
  try {
    const params = {
      page: page.value,
      size: size.value,
      userId: searchForm.value.userId,
      // 添加排序参数
      sortBy: sortConfig.value.prop,
      sortOrder: sortConfig.value.order === 'ascending' ? 'asc' : 'desc'
    }

    if (searchForm.value.timeRange?.length === 2) {
      params.startDateStr = searchForm.value.timeRange[0]
      params.endDateStr = searchForm.value.timeRange[1]
    }

    const res = await getUserLogs(params)
    logList.value = res.list
    total.value = res.total
  } catch (error) {
    console.error('获取日志列表失败：', error)
  } finally {
    loading.value = false
  }
}

// 处理查询
const handleSearch = () => {
  page.value = 1
  getList()
}

// 重置查询条件
const handleReset = () => {
  searchForm.value = {
    userId: null,
    timeRange: []
  }
  page.value = 1
  getList()
}

// 格式化日期时间
const formatDateTime = (dateStr) => {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  return date.toLocaleString()
}

// 处理页码变化
const handleCurrentChange = (newPage) => {
  page.value = newPage
  getList()
}

// 处理每页条数变化
const handleSizeChange = (newSize) => {
  size.value = newSize
  getList()
}

// 删除日志
const handleDelete = async () => {
  if (!deleteTimeRange.value || deleteTimeRange.value.length !== 2) {
    return ElMessage.warning('请选择要删除的时间范围')
  }

  try {
    await ElMessageBox.confirm('确定要删除选中时间范围内的日志吗？', '警告', {
      type: 'warning'
    })

    const [startDateStr, endDateStr] = deleteTimeRange.value
    await deleteUserLogsByTimeRange({
      startDateStr,
      endDateStr
    })
    ElMessage.success('删除成功')
    getList()
    deleteTimeRange.value = []
  } catch (error) {
    console.error('删除失败：', error)
  }
}

// 显示日志详情
const showDetail = (log) => {
  currentLog.value = log
  dialogVisible.value = true
}

// 解析JSON字符串
const parseJson = (jsonStr) => {
  try {
    if (typeof jsonStr === 'string') {
      return JSON.parse(jsonStr)
    }
    return jsonStr
  } catch (e) {
    return jsonStr
  }
}

// 获取用户列表
const getUserList = async () => {
  try {
    const res = await getUserListAll()
    userList.value = res.list
    filteredUserList.value = res.list
  } catch (error) {
    console.error('获取用户列表失败：', error)
  }
}

// 用户筛选方法
const filterUsers = (query) => {
  if (!query) {
    filteredUserList.value = userList.value
    return
  }

  const lowercaseQuery = query.toLowerCase()
  filteredUserList.value = userList.value.filter(user =>
    user.username.toLowerCase().includes(lowercaseQuery) ||
    String(user.id).includes(query)
  )
}

// 处理表格排序变化
const handleSortChange = ({ prop, order }) => {
  sortConfig.value = { prop, order }
  getList()
}

onMounted(() => {
  getList()
  getUserList() // 获取用户列表
})
</script>

<style lang="scss" scoped>
.user-log-container {
    .section-title {
        font-size: 16px;
        font-weight: 500;
        color: var(--theme-text-regular);
        margin: 0 0 16px;
        position: relative;
        padding-left: 12px;

        &::before {
            content: '';
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
            width: 4px;
            height: 16px;
            background-color: var(--theme-primary);
            border-radius: 2px;
        }
    }

    .search-section {
        background-color: var(--theme-bg-container);
        border: 1px solid var(--theme-border-light);
        padding: 16px;
        border-radius: 4px;
        margin-bottom: 16px;
    }

    .delete-section {
        background-color: var(--theme-danger-light);
        border: 1px solid var(--theme-danger-border);
        padding: 16px;
        border-radius: 4px;
        margin-bottom: 20px;

        .delete-form {
            display: flex;
            gap: 12px;
            align-items: center;
        }
    }

    .user-info {
        display: flex;
        align-items: center;
        gap: 8px;
        color: var(--theme-text-regular);
    }

    .pagination {
        margin-top: 10px;
        display: flex;
        justify-content: center;
        :deep(.el-pagination) {
          overflow-x: auto;
        }
    }
}

:root{
    .el-popper .el-scrollbar .user-option {
        display: flex;
        align-items: center;
        gap: 8px;

        .user-id {
            // color: #909399;
            font-size: 12px;
        }
    }
}

// 自定义 el-select 的宽度
:deep(.search-section .el-select) {
    width: 240px;
}
</style>
