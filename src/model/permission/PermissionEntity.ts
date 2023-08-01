import {
  ClassName,
  Dictionary,
  FieldName, IsArray, Type,
} from '@/airpower/decorator/Custom'
import { EntityConfig } from '@/airpower/decorator/EntityConfig'
import { FormField } from '@/airpower/decorator/FormField'
import { SearchField } from '@/airpower/decorator/SearchField'
import { TableField } from '@/airpower/decorator/TableField'
import { BaseEntity } from '@/base/BaseEntity'
import { ITree } from '@/airpower/interface/ITree'
import { PermissionSystemDictionary } from './PermissionSystemDictionary'

/**
 * # 权限
 * @author Hamm
 */
@EntityConfig({
  hideFieldSelector: true,
  hideAdvanceSearch: true,
  hideKeywordSearch: true,
})
@ClassName('权限')
export class PermissionEntity extends BaseEntity implements ITree {
  @TableField({
    forceShow: true,
    isCopyField: true,
  })
  @SearchField()
  @FormField({
    isRequiredString: true,
  })
  @Type(String)
  @FieldName('权限名称') name!: string

  @TableField({
    forceShow: true,
    isCopyField: true,
  })
  @FormField({
    isRequiredString: '请输入权限标识...',
    isUnique: true,
  })
  @FieldName('权限标识') identity!: string

  @Dictionary(PermissionSystemDictionary)
  @TableField({
    showColor: true,
    width: 100,
  })
  @FieldName('系统权限') isSystem!: boolean

  @FieldName('父级ID') parentId!: number

  // eslint-disable-next-line no-use-before-define
  @Type(PermissionEntity)
  @IsArray() children!: this[]

  // eslint-disable-next-line no-use-before-define
  @Type(PermissionEntity) parent!: this

  @TableField({
    removed: true,
  })
  declare createTime: number

  @TableField({
    removed: true,
  })
  declare isDisabled: boolean
}
