import { Expose } from 'class-transformer'
import { FieldName } from '@/airpower/decorator/CustomName'
import { FormField } from '@/airpower/decorator/FormField'
import { TableField } from '@/airpower/decorator/TableField'
import { AirEntity } from '@/airpower/dto/AirEntity'
import { AirDateTimeFormatter } from '@/airpower/enum/AirDateTimeFormatter'
import { SearchField } from '@/airpower/decorator/SearchField'
import { DisableRecord } from '@/model/record/DisableRecord'

/**
 * # 数据库实体基类
 * @author Hamm
 */
export class BaseEntity extends AirEntity {
  @FieldName('创建时间')
  @TableField({
    width: 170,
    orderNumber: -99,
    dateTimeFormatter: AirDateTimeFormatter.YYYY_MM_DD_HH_mm_ss,
  })
  @Expose() createTime!: number

  @FieldName('状态')
  @TableField({
    enumRecord: DisableRecord,
    showStatus: true,
    width: 80,
    orderNumber: -100,
  })
  @Expose() isDisabled!: boolean

  @FieldName('创建时间')
  @SearchField({
    between: true,
    orderNumber: -200,
  })
  @Expose() createBetween!: Array<string | number>

  @FieldName('备注')
  @FormField({
    isTextarea: true,
  })
  @Expose() remark!: string
}
