// mock.js
import Mock from 'mockjs-pro'
import db from './IndexedDB/'
import { getResBody, user } from './index'
import { findPermisson } from './permission-list'

/**
 * 注册
 */
Mock.mock('/api/sys/register', 'post', (options) => {
  return new Promise((resolve) => {
    options.body = JSON.parse(options.body)
    const { body } = options
    db.users.where({ username: body.username }).toArray((list) => {
      if (list.length) {
        resolve(getResBody(null, '用户名已经存在'))
      } else {
        db.users
          .add(
            Object.assign({}, user, {
              username: body.username,
              password: body.password,
              openTime: Date.now()
            })
          )
          .then(() => {
            resolve(getResBody(null, '成功', true))
          })
          .catch((e) => {
            resolve(getResBody(null, e, false))
          })
      }
    })
  })
})

/**
 * 登录
 */
Mock.mock(
  '/api/sys/login',
  'post',
  (options) =>
    new Promise((resolve) => {
      options.body = JSON.parse(options.body)
      const { body } = options

      db.users.where({ username: body.username }).toArray((list) => {
        if (list.length) {
          if (
            list[0].username === body.username &&
            list[0].password === body.password
          ) {
            resolve(
              getResBody(
                {
                  token: `Bearer d8c6ed7a-3fd4-46e4-a477-b20d1ce9cda0 ${Date.now()} ${
                    list[0].id
                  }`
                },
                '成功',
                true
              )
            )
          } else {
            resolve(getResBody(null, '用户名，密码错误'))
          }
        } else {
          resolve(getResBody(null, '用户未注册'))
        }
      })
    })
)

/**
 * 获取用户信息
 */
Mock.mock(/\bapi\/sys\/profile/, 'get', async (options) => {
  // token过期时间
  const overTime = 1000 * 60 * 60 * 6 // 6h
  // console.log(options.url)
  // url: "/api/sys/profile?token=Bearer+d8c6ed7a-3fd4-46e4-a477-b20d1ce9cda0+1681611859077 id"
  const lastTime = parseInt(options.url.split('+')[2])
  const id = parseInt(options.url.split('+')[3])
  if (Date.now() - lastTime < overTime) {
    const user = await db.users.get(id)
    if (!user) {
      return getResBody(null, '用户不存在')
    }

    // 根据员工角色列表去找角色
    // 根据角色中的权限列表去找权限
    const permissionIdList = []
    user.role = user.role.map((item) => item.id)
    for (const roleId of user.role) {
      const role = await db.roles.get(roleId)
      permissionIdList.push(...role.permissions)
    }

    // 根据权限获取对应的 页面权限，按钮权限代码
    const menus = []
    const points = []
    for (const permId of permissionIdList) {
      const perm = await findPermisson(permId)
      if (perm) {
        if (perm.type === 1 || perm.type === '1') {
          menus.push(perm.code)
        } else if (perm.type === 2 || perm.type === '2') {
          points.push(perm.code)
        }
      }
    }

    delete user.password
    user.permission = { menus, points }

    return getResBody(user, 'ok', true)
  } else {
    return getResBody(null, '认证过期')
  }
})

/**
 * 退出登录
 */
Mock.mock('/api/sys/logout', 'post', (options) => {
  return {
    success: true,
    code: 10000,
    data: {},
    message: '执行成功'
  }
})
