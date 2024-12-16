import { AbstractBaseService } from '@/base/AbstractBaseService'
import { UserEntity } from '@/model/user/UserEntity'
import { MenuEntity } from '../menu/MenuEntity'
import { OauthScope } from '@/model/oauth/OauthScope'
import { OauthCreateCodeRequest } from '@/model/oauth/OauthCreateCodeRequest'
import { ThirdLoginRequest } from '@/model/thirdlogin/ThirdLoginRequest'
import { UserThirdLoginEntity } from '@/model/thirdlogin/UserThirdLoginEntity'

/**
 * # 用户服务接口
 */
export class UserService extends AbstractBaseService<UserEntity> {
  baseUrl = 'user'

  entityClass = UserEntity

  async logout() {
    await this.api('logout')
      .post()
  }

  /**
   * ### App登录
   * @param user 用户
   */
  async login(user: UserEntity): Promise<string> {
    const result = await this.api('login')
      .post(user)
    return result as unknown as string
  }

  /**
   * ### 邮箱验证码登录
   * @param user 用户
   */
  async loginViaEmail(user: UserEntity): Promise<string> {
    const result = await this.api('loginViaEmail')
      .post(user)
    return result as unknown as string
  }

  /**
   * ### 重置密码
   * @param user 用户
   */
  async resetMyPassword(user: UserEntity): Promise<void> {
    await this.api('resetMyPassword')
      .post(user)
  }

  /**
   * ### 修改密码
   * @param user 用户
   */
  async updateMyPassword(user: UserEntity): Promise<void> {
    await this.api('updateMyPassword')
      .post(user)
  }

  /**
   * ### 获取我有权限的菜单列表
   */
  async getMyMenuList(): Promise<MenuEntity[]> {
    const jsonArray = await this.api('getMyMenuList')
      .post()
    return MenuEntity.fromJsonArray(jsonArray)
  }

  /**
   * ### 获取我的权限列表
   */
  async getMyPermissionList(): Promise<string[]> {
    const arr = await this.api('getMyPermissionList')
      .post()
    return arr as string[]
  }

  /**
   * ### 获取我的三方账号
   */
  async getMyThirdList(): Promise<UserThirdLoginEntity[]> {
    const arr = await this.api('getMyThirdList')
      .post()
    return UserThirdLoginEntity.fromJsonArray(arr)
  }

  /**
   * ### 获取我的个人信息
   */
  async getMyInfo(): Promise<UserEntity> {
    const json = await this.api('getMyInfo')
      .post()
    return UserEntity.fromJson(json)
  }

  async getScopeList(): Promise<OauthScope[]> {
    const json = await this.api('getScopeList', 'oauth2')
      .post()
    return OauthScope.fromJsonArray(json)
  }

  async authorize(appKey: string, scope: string): Promise<string> {
    const postData = new OauthCreateCodeRequest()
    postData.appKey = appKey
    postData.scope = scope
    const code = await this.api('createCode', 'oauth2')
      .post(postData)
    return code as unknown as string
  }

  async callbackCode(platform: string, code: string) {
    const postData = new ThirdLoginRequest()
    postData.platform = platform
    postData.code = code
    const result = await this.api('callback', 'oauth2').callbackError().post(postData)
    return result as unknown as string
  }

  async thirdBind(platform: string, code: string) {
    const postData = new ThirdLoginRequest()
    postData.platform = platform
    postData.code = code
    return this.api('thirdBind', 'oauth2').callbackError().post(postData)
  }

  async unBindThird(data: UserThirdLoginEntity) {
    return this.api('unBindThird', 'oauth2').callbackError().post(data)
  }
}
