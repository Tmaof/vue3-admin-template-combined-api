// mock.js
import Mock from 'mockjs-pro'
import db from './IndexedDB/'
import { getUrlParams, getResBody, user } from './index'

/**
 * 获取员工列表
 */
Mock.mock(
  /\bapi\/user-manage\/list/,
  'get',
  (options) =>
    new Promise((resolve) => {
      const page = parseInt(getUrlParams(options.url, 'page'))
      const size = parseInt(getUrlParams(options.url, 'size'))
      db.users
        .orderBy('id')
        .reverse()
        .offset((page - 1) * size)
        .limit(size)
        .toArray((list) => {
          db.users.count().then((total) => {
            resolve(getResBody({ list, total, page, size }, '', true))
          })
        })
    })
)

/**
 * excel导入员工
 */
Mock.mock('/api/user-manage/batch/import', 'post', async (options) => {
  options.body = JSON.parse(options.body)
  let { body } = options
  console.log(body, 'jjj')
  const list = []
  for (const item of body) {
    const res = await db.users.where({ username: item.username }).toArray()
    if (res.length) {
      list.push(...res)
    }
  }
  const anExistingUserName = list.map((item) => item.username)
  body = body.filter((item) => !anExistingUserName.includes(item.username))

  for (const item of body) {
    if (!item.role) {
      item.role = ''
    }
    item.role = item.role.split(/，|,/g)
    const newRole = []
    for (let title of item.role) {
      title = title.trim()
      // 角色列表没有的角色名，不会添加
      const list = await db.roles.where({ title }).toArray()
      if (list.length) {
        newRole.push({
          id: list[0].id,
          title
        })
      }
    }
    item.role = newRole
    if (!item.openTime) {
      item.openTime = Date.now()
    }
    await db.users.add(Object.assign({}, user, item))
  }

  if (anExistingUserName.length) {
    return getResBody(
      null,
      `部分员工用户名重复，未添加成功: \n${anExistingUserName}`
    )
  } else {
    return getResBody(null, '成功', true)
  }
})

/**
 * 删除员工
 */
Mock.mock(/\/api\/user-manage\/detele\//, 'get', async (options) => {
  const { url } = options
  const id = parseInt(url.match(/[0-9]*$/g)[0])
  const user = await db.users.get(id)
  if (user) {
    db.users.delete(user.id)
    return getResBody(null, 'ok', true)
  } else {
    return getResBody(null, '员工不存在')
  }
})

/**
 * 获取所有员工列表
 */

Mock.mock('/api/user-manage/all-list', 'get', async () => {
  let list = await db.users.orderBy(':id').toArray()
  list = list.map((item) => {
    delete item.password
    return item
  })

  return getResBody({ list }, 'ok', true)
})

/**
 * 获取指定员工的角色
 */
Mock.mock(/\/api\/user-manage\/role\//, 'get', async (options) => {
  const { url } = options
  const id = parseInt(url.match(/[0-9]*$/g)[0])
  const user = await db.users.get(id)
  if (user) {
    return getResBody({ role: user.role }, 'ok', true)
  }
  return getResBody(null, '员工不存在')
})

/**
 *为员工分配角色
 */
Mock.mock(/\/user-manage\/update-role\//, 'post', async (options) => {
  options.body = JSON.parse(options.body)
  const { body, url } = options
  const id = parseInt(url.match(/[0-9]*$/g)[0])
  for (const item of body) {
    if (!item.id || !item.title) {
      return getResBody(null, '数据格式不全')
    }
    item.title = item.title.trim()
    if (!item.describe) {
      item.describe = ''
    }
  }
  const updated = await db.users.update(id, { role: body })
  if (updated) {
    return getResBody(null, 'ok', true)
  }
  return getResBody(null, '员工不存在')
})
