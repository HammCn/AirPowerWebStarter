import { AbstractBaseService } from '@/base/AbstractBaseService'
import { AppEntity } from './AppEntity'

export class AppService extends AbstractBaseService<AppEntity> {
  entityClass = AppEntity

  baseUrl = 'app'

  async getAppByKey(appKey: string): Promise<AppEntity> {
    const app = new AppEntity()
    app.appKey = appKey
    const json = await this.api('getByAppKey').post(app)
    return AppEntity.fromJson(json)
  }
}
