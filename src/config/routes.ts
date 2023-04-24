import { RouteRecordRaw } from 'vue-router'

/**
 * # 路由配置
 */
export const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: '登录',
    component: () => import('@/view/login.vue'),
  },
  {
    path: '/',
    name: '首页',
    component: () => import('@/view/home.vue'),
  },
  {
    path: '/console',
    name: 'console',
    component: () => import('@/component/Console.vue'),
    children: [
      {
        path: '/:catchAll(.*)',
        component: () => import('@/airpower/ErrorPage.vue'),
      },
    ],
  },
  {
    path: '/:catchAll(.*)',
    component: () => import('@/airpower/ErrorPage.vue'),
  },
]
