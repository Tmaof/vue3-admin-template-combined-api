import i18n from '@/i18n'
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
        message: i18n.t('mock.sys.808363-0')
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
    message: i18n.t('mock.sys.808363-1')
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
        message: i18n.t('mock.sys.808363-1')
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
        message: i18n.t('mock.sys.808363-1')
      }
    }
  }

  return {
    success: false,
    code: 10000,
    data: {},
    message: i18n.t('mock.sys.808363-2')
  }
})

/**
 * 获取用户信息
 */
Mock.mock(/[\b/api/sys/profile]/, 'get', (options) => {
  // token过期时间
  const overTime = 1000 * 60 * 60 * 12 // 12h
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
            title: i18n.t('mock.sys.808363-3')
          }
        ],
        _id: '612710a0ec87aa543c9c341d',
        id: '0',
        username: 'super-admin',
        title: i18n.t('mock.sys.808363-3'),
        avatar:
          '/favicon.ico',
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
      message: i18n.t('mock.sys.808363-4')
    }
  } else {
    return {
      success: false,
      code: 200,
      message: i18n.t('mock.sys.808363-5')
    }
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
    message: i18n.t('mock.sys.808363-1')
  }
})
