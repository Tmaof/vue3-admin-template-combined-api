import i18n from '@/i18n'
import Layout from '@/layout'
/**
 *
用户每次登录都将会利用私有路由表进行计算过滤，这是修改原对象的，
如果用户没有刷新页面，下次登录时，会利用上次修改过的私有路由表进行计算，而不是使用完整定义的私有路由表。
所以，我们应该使用一个函数来返回路由表。
就像为什么vue选项式API的data始终应该声明为一个函数。
 */
export const publicRoutes = () => {
  return [
    // 这样做的目的是在那些没有任何私有权限的的用户登录时，也会显示一个布局页面，而不是404。
    {
      path: '/',
      component: Layout
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
      name: 'home',
      component: Layout,
      children: [
        {
          path: 'client',
          name: 'client-management',
          meta: {
            title: i18n.$t('router.routes.567293-0'),
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
        title: i18n.$t('router.routes.567293-1'),
        icon: 'my-key'
      },
      children: [
        {
          path: 'user',
          name: 'user-list',
          component: () => import('@/views/Acl/User'),
          meta: {
            title: i18n.$t('router.routes.567293-2')
          }
        },
        {
          path: 'role',
          name: 'role-list',
          component: () => import('@/views/Acl/Role'),
          meta: {
            title: i18n.$t('router.routes.567293-3')
          }
        },
        {
          path: 'menu',
          name: 'menu-list',
          component: () => import('@/views/Acl/Menu'),
          meta: {
            title: i18n.$t('router.routes.567293-4')
          }
        }
      ]
    }
  ]
}

export default publicRoutes
