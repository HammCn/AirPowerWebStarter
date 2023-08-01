import { AbstractBaseService } from '@/base/AbstractBaseService'
import { UserEntity } from '@/model/user/UserEntity'

export class UserService extends AbstractBaseService<UserEntity> {
  baseUrl = 'user'

  entityClass = UserEntity

  /**
   * # 登录
   * @param user 用户
   */
  async login(user: UserEntity): Promise<string> {
    const json = await this.api('login').post(user)
    return json as unknown as string
  }

  /**
   * # 注册
   * @param user 用户
   */
  async register(user: UserEntity): Promise<void> {
    await this.api('register').post(user)
  }

  /**
   * # 重置密码
   * @param user 用户
   */
  async resetMyPassword(user: UserEntity): Promise<void> {
    await this.api('resetMyPassword').post(user)
  }
}
