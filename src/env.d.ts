/* eslint-disable @typescript-eslint/no-explicit-any,no-unused-vars,@typescript-eslint/ban-types */
// / <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'

  const component: DefineComponent<{}, {}, any>
  export default component
}

interface ImportMetaEnv extends Readonly<Record<string, string | boolean>> {
  /**
   * 环境名称
   */
  VITE_APP_NAME: string

  /**
   * API根路径
   */
  VITE_APP_API: string

  /**
   * 基础服务首页地址
   */
  VITE_APP_HOME_URL: string

  /**
   * 单点登录SSO地址
   */
  VITE_APP_SSO_URL: string

  /**
   * 静态资源根路径
   */
  readonly VITE_APP_STATIC: string

  /**
   * 是否开发模式
   */
  DEV: boolean

  /**
   * 是否生产模式
   */
  PROD: boolean

  /**
   * 当前环境模式
   */
  MODE: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
