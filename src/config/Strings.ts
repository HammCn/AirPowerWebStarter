import { AirI18n } from '@/airpower/helper/AirI18n'

/**
 * # 语言包
 */
export abstract class Strings extends AirI18n {
  /**
   * # 返回当前语言包
   * 此方法为项目自定义封装，可用于简写部分语言包调用方法
   * @returns 当前语言包
   */
  static get(): Strings {
    return AirI18n.get() as Strings
  }

  /** # 用户 */
  abstract User: string

  /** # 添加用户 */
  abstract AddUser: string

  /** # 邮箱 */
  abstract Email: string

  /** # 密码 */
  abstract Password: string

  /** # 手机 */
  abstract Phone: string

  /** # 发送 */
  abstract Send: string

  /** # 验证码 */
  abstract Code: string

  /** # 密码登录 */
  abstract LoginViaPassword: string

  /** # 邮箱登录 */
  abstract LoginViaEmail: string

  /** # 手机登录 */
  abstract LoginViaPhone: string

  /** # 我已阅读并同意 */
  abstract ReadAndAgreed: string

  /** # 服务条款 */
  abstract TermsOfService: string

  /** # 隐私政策 */
  abstract PrivacyPolicy: string

  /** # 以及 */
  abstract And: string

  /** # 立即登录 */
  abstract LoginNow: string

  /** # 登录 */
  abstract Login: string
}
