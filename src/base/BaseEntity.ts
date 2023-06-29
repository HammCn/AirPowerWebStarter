import { FormField } from '@/airpower/decorator/FormField'
import { TableField } from '@/airpower/decorator/TableField'
import { EntityConfig } from '@/airpower/decorator/EntityConfig'
import { AirDateTimeFormatter } from '@/airpower/enum/AirDateTimeFormatter'
import { DisableDictionary } from '@/model/dictionary/DisableDictionary'
import { ClassName, FieldName } from '@/airpower/decorator/Custom'
import { AirEntity } from '@/airpower/base/AirEntity'

/**
 * # 数据库实体基类
 * @author Hamm
 */
@ClassName('数据')
@EntityConfig({
  keywordSearchPlaceholder: '搜的一下~',
})
export class BaseEntity extends AirEntity {
  @TableField({
    width: 170,
    orderNumber: -99,
    dateTimeFormatter: AirDateTimeFormatter.YYYY_MM_DD_HH_mm_ss,
  })
  @FieldName('创建时间')
    createTime!: number

  @TableField({
    dictionary: DisableDictionary,
    showStatus: true,
    width: 80,
    orderNumber: -100,
  })
  @FieldName('状态')
    isDisabled!: boolean

  @FormField({
    isTextarea: true,
  })
  @FieldName('备注')
    remark!: string
}
