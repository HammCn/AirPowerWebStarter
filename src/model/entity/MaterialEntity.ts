import { ClassName, FieldName, ToModel } from '@/airpower/decorator/Custom'
import { EntityConfig } from '@/airpower/decorator/EntityConfig'
import { FormField } from '@/airpower/decorator/FormField'
import { SearchField } from '@/airpower/decorator/SearchField'
import { TableField } from '@/airpower/decorator/TableField'
import { IPayload } from '@/airpower/interface/IPayload'
import { BaseEntity } from '@/base/BaseEntity'
import { MaterialType } from '@/model/enum/MaterialType'
import { MaterialTypeRecord } from '@/model/record/MaterialTypeRecord'

/**
 * # 物料
 * @author Hamm
 */
@ClassName('物料')
@EntityConfig({
  addTitle: '创建物料',
  keywordSearchPlaceholder: '物料编码/名称搜索...',
})
export class MaterialEntity extends BaseEntity {
  @FieldName('物料名称')
  @TableField({
    forceShow: true,
  })
  @SearchField()
  @FormField({
    isRequiredString: true,
  })
    name!: string

  @FieldName('规格型号')
  @TableField({
    isCopyField: true,
  })
  @SearchField()
  @FormField()
    spc!: string

  @FieldName('物料类型')
  @TableField({
    enumRecord: MaterialTypeRecord,
    showStatus: true,
    width: 100,
  })
  @FormField({
    enumRecord: MaterialTypeRecord,
    defaultValue: MaterialType.PUBLIC,
    isRequiredNumber: true,
  })
  @SearchField({
    enumRecord: MaterialTypeRecord,
  })
    materialType!: MaterialType

  @ToModel((obj: IPayload) => obj.unitId || obj.unitInfo?.id || undefined)
    unitId = 1
}
