import request from '@/utility/request'
/**
 * 获取角色列表
 */
export function getRoleList() {
  return request({ url: '/role/list', method: 'get' })
}

/**
 * 添加角色
 * @param {*} data
 * @returns
 */
export function addRole(data) {
  return request({ url: '/role/add', method: 'post', data })
}

/**
 * 删除角色
 */
export function deleteRole(id) {
  return request({ url: `/role/${id}`, method: 'delete' })
}

/**
 * 获取角色的权限，用于为角色分配权限
 */
export function getRolePermission(id) {
  return request({ url: `/role/permission/${id}`, method: 'get' })
}

/**
 * 为角色分配权限
 */
export function assignPermission(data) {
  return request({ url: '/role/update/permission', method: 'post', data })
}
