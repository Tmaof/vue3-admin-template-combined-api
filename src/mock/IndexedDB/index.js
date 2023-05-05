import Dexie from 'dexie'
import md5 from 'md5'
import { getPermissonList, updatePermissionList } from '../permission-list'
const db = new Dexie('myDatabase')
export default db

db.version(1).stores({
  users: '++id, role, openTime,username,password,avatar'
})
db.version(1).stores({
  roles: '++id, title, describe, permissions'
})
db.version(1).stores({
  permission: '++id, list'
})
resetDb()
/**
 * 重置数据库
 * @param {*} forcedInitialization 是否强制初始化数据库
 */
export async function resetDb(forcedInitialization) {
  const list = await db.users.orderBy(':id').toArray()
  // 当没有一条员工记录时，初始化数据库
  // 或者强制初始化
  if (!(list && list.length) || forcedInitialization) {
    initUser()
    initPerm()
    initRole()
  }
}
// 一条员工数据记录如下
/*
 {
    "role":[
        {
            "id":"1",
            "title":"超级管理员"
        }
    ],
    "id":"0",
    "openTime":"1433088000000",
    "username":"super-admin",
     password:xxxxxxxxxx,
    "avatar":"https://xxx.png"
},
 */

// 一条角色数据记录如下
/**
 *      {
            "id":"1",
            "title":"超级管理员",
            "describe":"唯一账号，可以操作系统所有功能",
            "permissions":['123','456']
        },
 */

// 一条权限记录如下
/**
{
"id": "1333329957008228353",
"pid": "1",
"name": "权限管理",
"code": "Acl",
"type": 1,
"children": []
}
 */

/**
 * 添加默认员工
 */

async function initUser() {
  const defaultUserList = [
    {
      id: 0,
      role: [
        {
          id: 2,
          title: '管理员'
        }
      ],
      openTime: '2023-05-04',
      username: 'admin',
      password: md5('000000'),
      avatar: '/favicon.ico'
    },
    {
      id: 1,
      role: [
        {
          id: 3,
          title: '客户经理'
        }
      ],
      openTime: '2023-05-04',
      username: 'maofu',
      password: md5('000000'),
      avatar: '/favicon.ico'
    },
    {
      id: 3,
      role: [
        {
          id: 4,
          title: '管理员-仅查看'
        }
      ],
      openTime: '2023-05-04',
      username: 'admin-look',
      password: md5('000000'),
      avatar: '/favicon.ico'
    }
  ]
  for (const item of defaultUserList) {
    await db.users.put(item)
  }
}

/**
 * 添加默认角色
 */

async function initRole() {
  const defaultRoleList = [
    {
      title: '管理员',
      describe: '拥有所有权限',
      permissions: [
        '1',
        '1683201242256',
        '1683201972962',
        '1683201995991',
        '1683202016584',
        '1683201932454',
        '1683281633240',
        '1683281656214',
        '1683281699123',
        '1683281734858',
        '1683281758700',
        '1683281786841',
        '1683281825373',
        '1683281847403',
        '1683281866794'
      ],
      id: 2
    },
    {
      title: '客户经理',
      describe: '可查看客户管理',
      permissions: ['1683201932454'],
      id: 3
    },
    {
      title: '管理员-仅查看',
      describe: '只有查看权限',
      permissions: [
        '1',
        '1683201242256',
        '1683201972962',
        '1683201995991',
        '1683202016584',
        '1683201932454'
      ],
      id: 4
    }
  ]
  for (const role of defaultRoleList) {
    await db.roles.put(role)
  }
}

/**
 * 添加默认权限
 */

async function initPerm() {
  const defaultPermList = [
    {
      id: '1683201242256',
      pid: '1',
      name: '权限管理',
      code: 'acl',
      type: 1,
      children: [
        {
          id: '1683201972962',
          pid: '1683201242256',
          name: '员工列表',
          code: 'user-list',
          type: 1,
          children: [
            {
              id: '1683281633240',
              pid: '1683201972962',
              name: 'excel导入员工',
              code: 'excel-import',
              type: 2,
              children: []
            },
            {
              id: '1683281656214',
              pid: '1683201972962',
              name: '删除员工',
              code: 'delete-user',
              type: 2,
              children: []
            },
            {
              id: '1683281699123',
              pid: '1683201972962',
              name: '为员工分配角色',
              code: 'assign-role',
              type: 2,
              children: []
            }
          ]
        },
        {
          id: '1683201995991',
          pid: '1683201242256',
          name: '角色列表',
          code: 'role-list',
          type: 1,
          children: [
            {
              id: '1683281734858',
              pid: '1683201995991',
              name: '添加角色',
              code: 'add-role',
              type: 2,
              children: []
            },
            {
              id: '1683281758700',
              pid: '1683201995991',
              name: '删除角色',
              code: 'delete-role',
              type: 2,
              children: []
            },
            {
              id: '1683281786841',
              pid: '1683201995991',
              name: '为角色分配权限',
              code: 'assign-perm',
              type: 2,
              children: []
            }
          ]
        },
        {
          id: '1683202016584',
          pid: '1683201242256',
          name: '权限列表',
          code: 'menu-list',
          type: 1,
          children: [
            {
              id: '1683281825373',
              pid: '1683202016584',
              name: '添加根权限',
              code: 'add-root-perm',
              type: 2,
              children: []
            },
            {
              id: '1683281847403',
              pid: '1683202016584',
              name: '添加子权限',
              code: 'add-children-perm',
              type: 2,
              children: []
            },
            {
              id: '1683281866794',
              pid: '1683202016584',
              name: '删除权限',
              code: 'delete-perm',
              type: 2,
              children: []
            }
          ]
        }
      ]
    },
    {
      id: '1683201932454',
      pid: '1',
      name: '客户管理',
      code: 'client-management',
      type: 1,
      children: []
    }
  ]
  const list = await getPermissonList()
  list[0].children = defaultPermList
  await updatePermissionList(list)
}
