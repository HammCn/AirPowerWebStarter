import { AbstractBaseService } from '@/base/AbstractBaseService'
import { UserEntity } from '@/model/user/UserEntity'
import { MenuEntity } from '../menu/MenuEntity'
import { OauthScope } from '@/model/oauth/OauthScope'
import { OauthCreateCodeRequest } from '@/model/oauth/OauthCreateCodeRequest'

/**
 * # 用户服务接口
 */
export class UserService extends AbstractBaseService<UserEntity> {
  baseUrl = 'user'

  entityClass = UserEntity

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
   * ### 获取我有权限的菜单列表
   */
  async getMyMenuList(): Promise<MenuEntity[]> {
    const jsonArray = await this.api('getMyMenuList')
      .post()
    return MenuEntity.fromJsonArray(jsonArray)
  }

  /**
   * ### 获取我d的权限列表
   */
  async getMyPermissionList(): Promise<string[]> {
    const arr = await this.api('getMyPermissionList')
      .post()
    return arr as string[]
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
}
