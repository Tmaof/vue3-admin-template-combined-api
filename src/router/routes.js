import i18n from '@/i18n'
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
        title: i18n.$t('router.routes.817884-0'),
        icon: 'my-info'
      },
      children: [
        {
          path: 'info',
          name: 'info',
          component: () => import('@/views/Info'),
          meta: {
            title: i18n.$t('router.routes.817884-0'),
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
            title: i18n.$t('router.routes.817884-1'),
            icon: 'my-user'
          },
          component: () => import('@/views/Client')
        }
      ]
    },
    // 权限管理
    {
      path: '/acl',
      name: 'acl',
      redirect: '/acl/user',
      component: Layout,
      meta: {
        title: i18n.$t('router.routes.817884-2'),
        icon: 'my-key'
      },
      children: [
        {
          path: 'user',
          name: 'user-list',
          component: () => import('@/views/Acl/User'),
          meta: {
            title: i18n.$t('router.routes.817884-3')
          }
        },
        {
          path: 'role',
          name: 'role-list',
          component: () => import('@/views/Acl/Role'),
          meta: {
            title: i18n.$t('router.routes.817884-4')
          }
        },
        {
          path: 'menu',
          name: 'menu-list',
          component: () => import('@/views/Acl/Menu'),
          meta: {
            title: i18n.$t('router.routes.817884-5')
          }
        }
      ]
    },
    // 日志管理
    {
      path: '/log',
      name: 'log-management',
      component: Layout,
      redirect: '/log/user',
      meta: {
        title: i18n.$t('router.routes.611347-0'),
        icon: 'my-log'
      },
      children: [
        {
          path: 'client',
          name: 'client-log',
          component: () => import('@/views/Log/Client'),
          meta: {
            title: i18n.$t('router.routes.611347-1')
          }
        },
        {
          path: 'user',
          name: 'user-log',
          component: () => import('@/views/Log/User'),
          meta: {
            title: i18n.$t('router.routes.611347-2')
          }
        }
      ]

    }
  ]
}

export default publicRoutes
