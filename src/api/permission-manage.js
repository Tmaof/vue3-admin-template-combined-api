import request from '@/utility/request'

/**
 * 添加权限
 * @param {*} data
 * @returns
 */
export function addPermission(data) {
  return request({ url: '/permission/add', method: 'post', data })
}

/**
 * 获取权限列表
 */
export function getPermissionList() {
  return request({ url: '/permission/list', method: 'get' })
}

/**
 * 删除权限
 * 删除权限时，会删除该权限的子权限。
   若角色中有该权限（包括子权限），也会进行删除。
 */
export function deletePermission(id) {
  return request({
    url: `/permission/${id}`,
    method: 'delete'
  })
}
