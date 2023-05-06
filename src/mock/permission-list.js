import i18n from '@/i18n'
import Mock from 'mockjs-pro'
import db from './IndexedDB/'
import { getResBody, permission, getUrlParams } from './index'

/**
 * 添加权限
 */
Mock.mock('/api/permission/add', 'post', async (options) => {
  options.body = JSON.parse(options.body)
  let { body } = options
  // 参数校验
  if (!(body.name && body.pid && body.code && body.type)) {
    return getResBody(null, i18n.t('mock.permission-list.017836-0'))
  }

  // 添加id
  body.id = Date.now().toString()
  if (body.pid === 1) {
    body.pid = '1'
  }
  body = Object.assign({}, permission, body)

  // 添加子权限
  // 获取所有权限数据
  // 进行递归遍历，寻找父权限
  // 在父权限的 children 中添加该权限
  // 更新权限列表

  const res = await operatePermissionObj(body.pid, (perm) => {
    perm.children.push(body)
  })

  if (res) {
    return getResBody(null, 'ok', true)
  }
  return getResBody(null, i18n.t('mock.permission-list.017836-1'))
})

/**
 * 获取所有权限列表
 */
Mock.mock('/api/permission/list', 'get', async () => {
  const list = await getPermissonList()

  return getResBody(list[0].children, 'ok', true)
})

/**
 * 删除权限
 * 删除权限时，会删除该权限的子权限。
   若角色中有该权限（包括子权限），也会进行删除。
 */
Mock.mock(/\/permission\/detele/, 'get', async (options) => {
  const id = getUrlParams(options.url, 'id')
  const pid = getUrlParams(options.url, 'pid')

  if (!(id && pid)) {
    return getResBody(null, i18n.t('mock.permission-list.017836-2'))
  }

  // 若角色中有该权限（包括子权限），也会进行删除。
  await operatePermissionObj(id, async (perm) => {
    const deleteIds = []
    deleteIds.push(perm.id)
    getAllDeleteId(perm.children, deleteIds)

    const roleList = await db.roles.orderBy(':id').toArray()
    for (const role of roleList) {
      role.permissions = role.permissions.filter(
        (item) => !deleteIds.includes(item)
      )

      await db.roles.update(role.id, role)
    }
  })

  await operatePermissionObj(pid, (perm) => {
    perm.children = perm.children.filter((item) => item.id !== id)
  })

  /**
   * 获取要删除的权限id
   * @param {*} roleList
   * @param {*} idList
   */
  function getAllDeleteId(roleList, idList) {
    for (const role of roleList) {
      idList.push(role.id)
      if (role.children && role.children.length) {
        getAllDeleteId(role.children, idList)
      }
    }
  }

  return getResBody(null, 'ok', true)
})

/**
 * 读取权限列表
 *
 *       list: [
        {
          id: '1',
          pid: '0',
          name: i18n.t('mock.permission-list.017836-3'),
          code: '',
          children: []
        }
      ]
 * @returns
 */
export async function getPermissonList() {
  const res = await db.permission.get(0)

  if (res) {
    return res.list
  } else {
    // 没有则新建
    await db.permission.put({
      list: [
        {
          id: '1',
          pid: '0',
          name: i18n.t('mock.permission-list.017836-3'),
          code: '',
          children: []
        }
      ],
      id: 0
    })
    const res = await db.permission.get(0)
    return res.list
  }
}

/**
 * 更新权限列表
 * @param {*} list
 */
export async function updatePermissionList(list) {
  await db.permission.update(0, { list })
}

/**
 * 根据权限id寻找权限对象，可以在回调函数中对其进行操作，最后结果将会被保存
 *
 */
export async function operatePermissionObj(id, callback) {
  const permissionList = await getPermissonList()
  const perm = await findPerm(permissionList, id)
  if (perm) {
    callback(perm)
    await updatePermissionList(permissionList)
    return true
  }
  return false
}

/**
 * 根据id 寻找权限
 * @param {*} id
 * @returns
 */
export async function findPermisson(id) {
  const permissionList = await getPermissonList()
  return findPerm(permissionList, id)
}
function findPerm(list, id) {
  for (const perm of list) {
    if (perm.id === id) {
      return perm
    }

    if (perm.children && perm.children.length) {
      const res = findPerm(perm.children, id)
      if (res) {
        return res
      }
    }
  }
}
