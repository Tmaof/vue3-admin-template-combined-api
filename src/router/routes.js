import Layout from '@/layout'

export const publicRoutes = () => {
  return [
    // 根布局路由页面要存在于公有路由表中
    // 这样做的目的是在那些没有任何私有权限的的用户登录时，也会显示一个布局页面，而不是404。
    {
      path: '/',
      component: Layout
    },
    {
      path: '/info',
      component: Layout,
      redirect: '/info/info',
      meta: {
        title: '信息提示',
        icon: 'my-info'
      },
      children: [
        {
          path: 'info',
          name: 'info',
          component: () => import('@/views/Info'),
          meta: {
            title: '信息提示',
            icon: 'my-info'
          }
        }
      ]
    },
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
}

export const privateRoutes = () => {
  return [
    {
      path: '/',
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
}

export default publicRoutes
