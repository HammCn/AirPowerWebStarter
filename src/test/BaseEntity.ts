import { AirEntity } from '@/airpower/base/AirEntity'
import { Alias, Default } from '@/airpower/decorator/Custom'

export class BaseEntity extends AirEntity {
  name!: string

  @Default('暂无备注')
  @Alias('desc')
    remark!: string
}
