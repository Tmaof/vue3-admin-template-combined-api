import i18n from '@/i18n'
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

const privateRoutes = [
  {
    path: '/',
    redirect: '/client',
    component: Layout,
    meta: { title: i18n.$t('router.routes.808363-0') },
    children: [
      {
        path: 'client',
        meta: {
          title: i18n.$t('router.routes.808363-1'),
          icon: 'my-user'
        },
        component: () => import('@/views/Client')
      }
    ]
  },
  {
    path: '/acl',
    redirect: '/acl/user',
    component: Layout,
    meta: {
      title: i18n.$t('router.routes.808363-2'),
      icon: 'my-key'
    },
    children: [
      {
        path: 'user',
        component: () => import('@/views/Acl/User'),
        meta: {
          title: i18n.$t('router.routes.808363-3')
        }
      },
      {
        path: 'role',
        component: () => import('@/views/Acl/Role'),
        meta: {
          title: i18n.$t('router.routes.808363-4')
        }
      },
      {
        path: 'menu',
        component: () => import('@/views/Acl/Menu'),
        meta: {
          title: i18n.$t('router.routes.808363-5')
        }
      }
    ]
  }
]

export default [...publicRoutes, ...privateRoutes]
