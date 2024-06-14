import { Form } from '@/airpower/decorator/FormField'
import { Table } from '@/airpower/decorator/TableField'
import { EntityConfig } from '@/airpower/decorator/EntityConfig'
import { AirDateTimeFormatter } from '@/airpower/enum/AirDateTimeFormatter'
import {
  Field, Model, Type,
} from '@/airpower/decorator/Custom'
import { AirEntity } from '@/airpower/base/AirEntity'
import { Search } from '@/airpower/decorator/SearchField'
import { AirSearchDataType } from '@/airpower/enum/AirSearchDataType'

/**
 * # 数据库实体基类
 * @author Hamm.cn
 */
@EntityConfig({
})
@Model('记录')
export class BaseEntity extends AirEntity {
  @Field('创建时间')
  @Table({
    width: 170,
    orderNumber: -99,
    hide: true,
    dateTimeFormatter: AirDateTimeFormatter.YYYY_MM_DD_HH_mm_ss,
  })
  @Type(Number) createTime!: number

  @Field('备注')
  @Search({
    orderNumber: -100,
    dataType: AirSearchDataType.TEXTAREA,
    hide: true,
  })
  @Form({
    textarea: true,
    orderNumber: -100,
    hide: true,
  })
  @Type(String) remark!: string
}
