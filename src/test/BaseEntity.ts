import { AirModel } from '@/airpower/base/AirModel'
import { Alias, Default, Type } from '@/airpower/decorator/Custom'

export class BaseEntity extends AirModel {
  @Type(Number) id!: number

  name!: string

  @Default('暂无备注')
  @Alias('desc') remark!: string
}
