import {
  ClassName,
  Dictionary,
  FieldName, Type,
} from '@/airpower/decorator/Custom'
import { EntityConfig } from '@/airpower/decorator/EntityConfig'
import { FormField } from '@/airpower/decorator/FormField'
import { SearchField } from '@/airpower/decorator/SearchField'
import { TableField } from '@/airpower/decorator/TableField'
import { BaseEntity } from '@/base/BaseEntity'
import { RoleSystemDictionary } from './RoleSystemDictionary'

/**
 * # 角色
 * @author Hamm
 */
@EntityConfig({
  hideAdvanceSearch: true,
  hideKeywordSearch: true,
})
@ClassName('角色')
export class RoleEntity extends BaseEntity {
  @TableField({
    forceShow: true,
    isCopyField: true,
  })
  @SearchField()
  @FormField({
    isRequiredString: true,
  })
  @Type(String)
  @FieldName('角色名称') name!: string

  @Dictionary(RoleSystemDictionary)
  @TableField({
    showColor: true,
    width: 100,
    orderNumber: -100,
  })
  @FieldName('类别') isSystem!: boolean
}
