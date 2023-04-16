// mock.js
import Mock from 'mockjs'
import { setItem, getItem } from '@/utility/storage'

const KeyUserList = 'userList'

const userList = getItem(KeyUserList) || []
// 白名单
const whiteUserList = [
  {
    username: 'admin',
    password: '',
    token: ''
  }
]

/**
 * 注册
 */
Mock.mock('/api/sys/register', 'post', (options) => {
  options.body = JSON.parse(options.body)
  const allUserList = [...userList, ...whiteUserList]
  for (const value of allUserList) {
    if (value.username === options.body.username) {
      return {
        success: false,
        code: 10000,
        data: {},
        message: '用户名已经被占用'
      }
    }
  }
  // 注册成功
  // 保存在本地存储
  userList.push(options.body)
  setItem(KeyUserList, userList)
  return {
    success: true,
    code: 10000,
    data: {},
    message: '执行成功'
  }
})

/**
 * 登录
 */
Mock.mock('/api/sys/login', 'post', (options) => {
  options.body = JSON.parse(options.body)

  for (const value of whiteUserList) {
    if (value.username === options.body.username) {
      return {
        success: true,
        code: 10000,
        data: {
          token: `Bearer d8c6ed7a-3fd4-46e4-a477-b20d1ce9cda0 ${Date.now()}`
        },
        message: '执行成功'
      }
    }
  }

  for (const value of userList) {
    if (
      value.username === options.body.username &&
      value.password === options.body.password
    ) {
      return {
        success: true,
        code: 10000,
        data: {
          token: `Bearer d8c6ed7a-3fd4-46e4-a477-b20d1ce9cda0 ${Date.now()}`
        },
        message: '执行成功'
      }
    }
  }

  return {
    success: false,
    code: 10000,
    data: {},
    message: '用户未注册或者用户名，密码错误'
  }
})

/**
 * 获取用户信息
 */
Mock.mock(/[\b/api/sys/profile]/, 'get', (options) => {
  // token过期时间
  const overTime = 1000 * 60 * 30 // 30min
  // console.log(options.url)
  // url: "/api/sys/profile?token=Bearer+d8c6ed7a-3fd4-46e4-a477-b20d1ce9cda0+1681611859077"
  const lastTime = options.url.split('+')[2]
  if (Date.now() - lastTime < overTime) {
    return {
      success: true,
      code: 200,
      data: {
        role: [
          {
            id: '1',
            title: '超级管理员'
          }
        ],
        _id: '612710a0ec87aa543c9c341d',
        id: '0',
        username: 'super-admin',
        title: '超级管理员',
        avatar:
          'https://m.imooc.com/static/wap/static/common/img/logo-small@2x.png',
        permission: {
          menus: [
            'userManage',
            'roleList',
            'permissionList',
            'articleRanking',
            'articleCreate'
          ],
          points: [
            'distributeRole',
            'importUser',
            'removeUser',
            'distributePermission'
          ]
        }
      },
      message: '获取资料成功'
    }
  } else {
    return {
      success: false,
      code: 200,
      message: '获取资料失败'
    }
  }
})

Mock.mock('/api/sys/logout', 'post', (options) => {
  return {
    success: true,
    code: 10000,
    data: {},
    message: '执行成功'
  }
})