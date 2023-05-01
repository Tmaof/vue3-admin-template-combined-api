import Layout from '@/layout'

export const publicRoutes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/Register')
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/views/404')
  }
]

export const privateRoutes = [
  {
    path: '/',
    name: 'home',
    component: Layout,
    children: [
      {
        path: 'client',
        name: 'client-management',
        meta: {
          title: '客户管理',
          icon: 'my-user'
        },
        component: () => import('@/views/Client')
      }
    ]
  },
  {
    path: '/acl',
    name: 'acl',
    redirect: '/acl/user',
    component: Layout,
    meta: {
      title: '权限管理',
      icon: 'my-key'
    },
    children: [
      {
        path: 'user',
        name: 'user-list',
        component: () => import('@/views/Acl/User'),
        meta: {
          title: '员工列表'
        }
      },
      {
        path: 'role',
        name: 'role-list',
        component: () => import('@/views/Acl/Role'),
        meta: {
          title: '角色列表'
        }
      },
      {
        path: 'menu',
        name: 'menu-list',
        component: () => import('@/views/Acl/Menu'),
        meta: {
          title: '权限列表'
        }
      }
    ]
  }
]

export default publicRoutes
