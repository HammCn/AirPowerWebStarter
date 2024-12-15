import { NotifyEntity } from '@/model/open/notify/NotifyEntity'
import { AbstractBaseService } from '@/base/AbstractBaseService'
import { IDictionary } from '@/airpower/interface/IDictionary'

export class NotifyService extends AbstractBaseService<NotifyEntity> {
  baseUrl = 'notify'

  entityClass = NotifyEntity

  async getSceneList(): Promise<IDictionary[]> {
    const result = await this.api('getSceneList')
      .post()
    return (result as unknown as IDictionary[])
  }
}
