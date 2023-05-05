import Mock from 'mockjs-pro'
import db from './IndexedDB/'
import { getResBody, role } from './index'
import { getPermissonList, findPermisson } from './permission-list'

/**
 * 添加角色
 */
Mock.mock('/api/role/add', 'post', async (options) => {
  options.body = JSON.parse(options.body)
  const { body } = options
  body.title = body.title.trim()
  const res = await db.roles.where({ title: body.title }).toArray()
  if (res.length) {
    return getResBody(null, '角色名重复，未添加成功。')
  }
  await db.roles.add(Object.assign({}, role, body))
  return getResBody(null, '成功', true)
})

/**
 * 获取角色列表
 */
Mock.mock('/api/role/list', 'get', async (options) => {
  const list = await db.roles.orderBy(':id').toArray()
  for (const role of list) {
    const names = []
    for (const id of role.permissions) {
      const perm = await findPermisson(id)
      names.push(perm.name)
    }
    role.names = names
  }
  return getResBody(list, 'ok', true)
})

/**
 * 删除角色
 */
Mock.mock(/\/role\/detele\//, 'get', async (options) => {
  const { url } = options
  let id
  try {
    id = parseInt(url.match(/[0-9]*$/g)[0])
  } catch {
    return getResBody(null, '数据格式错误')
  }
  await db.roles.delete(id)
  await deleteUserRole()
  return getResBody(null, 'ok', true)

  // 删除角色后，要删除员工角色列表中的该角色。
  async function deleteUserRole() {
    const userList = await db.users.orderBy(':id').toArray()
    for (const user of userList) {
      user.role = user.role.filter((role) => role.id !== id)
      await db.users.update(user.id, { role: user.role })
    }
  }
})

/**
 * 获取角色的权限，用于为角色分配权限
 */
Mock.mock(/\/role\/permission\//, 'get', async (options) => {
  // 获取角色的权限id列表
  // 获取所有权限列表数据
  // 遍历所有权限列表，将用户拥有的权限添加 select:1 字段 没有则添加 select:0 字段
  // 放回修改后的所有权限列表
  const id = parseInt(options.url.match(/[0-9]*$/g)[0])
  const role = await db.roles.get(id)
  if (!role) {
    return getResBody(null, '角色不存在')
  }

  const RolePermIds = role.permissions || []
  const permList = await getPermissonList()

  traversalList(permList, RolePermIds)
  function traversalList(list, ids) {
    for (const item of list) {
      if (ids.includes(item.id)) {
        item.select = 1
      } else {
        item.select = 0
      }

      if (item.children && item.length) {
        traversalList(item.children, ids)
      }
    }
  }

  return getResBody({ list: permList, selected: RolePermIds }, 'ok', true)
})

/**
 * 为角色分配权限
 */
Mock.mock('/api/role/distribute-permission', 'post', async (options) => {
  options.body = JSON.parse(options.body)
  const { body } = options
  // 参数校验
  if (!(body.roleId && body.permissions && Array.isArray(body.permissions))) {
    return getResBody(null, '参数格式不正确')
  }

  const role = await db.roles.get(body.roleId)
  if (!role) {
    return getResBody(null, '未找到该角色')
  }
  role.permissions = body.permissions
  await db.roles.update(body.roleId, role)
  return getResBody(null, 'ok', true)
})
