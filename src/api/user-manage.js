import request from '@/utility/request'

/**
 * 分页获取员工列表
 * @param {*} page
 * @param {*} size
 * @returns
 */
export function getUserList(page, size) {
  return request({
    url: '/user/paging',
    method: 'get',
    params: { page, size }
  })
}

/**
 * 批量添加员工
 * @param {*} data
 * @returns
 */
export function addUserBatch(data) {
  return request({ url: '/user/add/batch', method: 'post', data: { payload: data } })
}

/**
 * 根据id删除员工
 * @param {*} id
 * @returns
 */
export function deleteUserById(id) {
  return request({ url: `/user/${id}`, method: 'delete' })
}

/**
 * 获取所有员工列表
 */
export function getUserListAll() {
  return request({ url: '/user/batch/excel', method: 'get' })
}

/**
 * 获取指定员工的角色
 */
export function getUserRole(userId) {
  return request({ url: `/user/role/${userId}`, method: 'get' })
}

/**
 * 为员工分配角色
 */

export function assignRolesToUser(id, data) {
  return request({
    url: '/user/update/role',
    method: 'post',
    data: {
      userId: id,
      payload: data
    }
  })
}
