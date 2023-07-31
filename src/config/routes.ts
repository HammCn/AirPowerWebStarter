import { RouteRecordRaw } from 'vue-router'

/**
 * # 路由配置
 * @author Hamm
 */
export const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: '登录',
    component: () => import('@/view/login.vue'),
  },
  {
    path: '/home',
    name: '首页',
    component: () => import('@/view/home.vue'),
  },
  {
    path: '/',
    name: 'console',
    redirect: '/home',
    component: () => import('@/component/Console.vue'),
    children: [
      {
        path: ':catchAll(.*)',
        component: () => import('@/airpower/ErrorPage.vue'),
      },
    ],
  },
]
