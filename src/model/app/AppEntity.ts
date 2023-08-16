import { ClassName, FieldName } from '@/airpower/decorator/Custom'
import { EntityConfig } from '@/airpower/decorator/EntityConfig'
import { FormField } from '@/airpower/decorator/FormField'
import { TableField } from '@/airpower/decorator/TableField'
import { BaseEntity } from '@/base/BaseEntity'

@EntityConfig({
  hideFieldSelector: true,
})
@ClassName('应用')
export class AppEntity extends BaseEntity {
  @TableField()
  @FormField({
    requiredString: true,
  })
  @FieldName('AppKey') appKey!: string

  @TableField()
  @FormField({
    requiredString: true,
  })
  @FieldName('应用名称') appName!: string

  @TableField()
  @FormField({
    requiredString: true,
    placeholder: '带协议头,无需/结尾',
  })
  @FieldName('应用地址') url!: string
}
