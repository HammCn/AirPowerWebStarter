import { AirI18n } from '@/airpower/helper/AirI18n'

/* eslint-disable no-unused-vars */
/**
 * # 语言包
 */
export abstract class Strings extends AirI18n {
  /**
   * # 返回当前语言包
   *
   * ---
   * #### 💡 此方法为项目自定义封装，可用于简写部分语言包调用方法
   * ---
   * @returns 当前语言包
   */
  static get(): Strings {
    return AirI18n.get() as Strings
  }

  /**
   * # 你好，世界
   */
  abstract Hello_World: string

  /**
   * # 用户
   */
  abstract User: string

  /**
   * # 添加用户
   */
  abstract AddUser: string

  /**
   * # 邮箱
   */
  abstract Email: string
}
