import { ClassName, Dictionary, FieldName } from '@/airpower/decorator/Custom'
import { BaseEntity } from '@/base/BaseEntity'
import { SupplierLevel } from './SupplierLevel'
import { FormField } from '@/airpower/decorator/FormField'
import { TableField } from '@/airpower/decorator/TableField'
import { SupplierLevelDictionary } from './SupplierLevelDictionary'

@ClassName('供应商')
export class SupplierEntity extends BaseEntity {
  @TableField({
    isCopyField: true,
    forceShow: true,
  })
  @FormField({
    isRequiredString: true,
  })
  @FieldName('供应商编码') code!: string

  @TableField()
  @FormField({
    isRequiredString: true,
  })
  @FieldName('供应商名称') name!: string

  @Dictionary(SupplierLevelDictionary)
  @TableField({
    showColor: true,
  })
  @FormField({
    isRequiredNumber: true,
    defaultValue: SupplierLevel.GOLD,
  })
  @FieldName('供应商级别') level!: SupplierLevel

  @TableField()
  @FormField({
    isMobilePhone: true,
  })
  @FieldName('联系电话') phone!: string
}
