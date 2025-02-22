import request from '@/utility/request'

/**
 * 获取用户日志列表
 * @param {Object} params - 查询参数 {page, size, userId, startDateStr, endDateStr}
 * @returns Promise
 */
export function getUserLogs(params) {
  return request({
    url: '/user-log/paging',
    method: 'get',
    params
  })
}

/**
 * 删除指定时间范围内的用户日志
 * @param {Object} data - {startDateStr, endDateStr}
 * @returns Promise
 */
export function deleteUserLogsByTimeRange(data) {
  return request({
    url: '/user-log/time-range',
    method: 'delete',
    data
  })
}
