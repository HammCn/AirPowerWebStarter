import { AirAbstractService } from '@/airpower/base/AirAbstractService'
import { UserEntity } from '../user/UserEntity'
import { AirHttp } from '@/airpower/helper/AirHttp'

export class MailService extends AirAbstractService {
  baseUrl = 'mail'

  api(url: string, baseUrl?: string | undefined): AirHttp {
    const http = super.api(url, baseUrl)
    http.setTimeout(10000)
    return http
  }

  /**
   * # 发送验证码
   * @param user 用户
   */
  async sendCode(user: UserEntity): Promise<void> {
    await this.api('send').post(user)
  }
}
