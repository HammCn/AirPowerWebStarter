import { Table } from '@/airpower/decorator/TableField'
import { AirDateTimeFormatter } from '@/airpower/enum/AirDateTimeFormatter'
import { Model } from '@/airpower/decorator/Model'
import { AirEntity } from '@/airpower/base/AirEntity'
import { Field } from '@/airpower/decorator/Field'

/**
 * # 数据库实体基类
 * @author Hamm.cn
 */
@Model({})
export class BaseEntity extends AirEntity {
  @Table({
    width: 170,
    orderNumber: -99,
    hide: true,
    dateTimeFormatter: AirDateTimeFormatter.YYYY_MM_DD_HH_mm_ss,
  })
  @Field({
    label: '创建时间',
    type: Number,
  })
    createTime!: number
}
