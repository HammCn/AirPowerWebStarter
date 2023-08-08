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
import { RoleSystemDictionary } from './RoleSystemDictionary'
import { MenuEntity } from '../menu/MenuEntity'
import { PermissionEntity } from '../permission/PermissionEntity'

/**
 * # 角色
 * @author Hamm
 */
@EntityConfig({
  showFilter: true,
  showSearch: true,
})
@ClassName('角色')
export class RoleEntity extends BaseEntity {
  @TableField({
    forceShow: true,
  })
  @SearchField()
  @FormField({
    requiredString: true,
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

  @Type(MenuEntity)
  @IsArray() menuList!: MenuEntity[]

  @Type(PermissionEntity)
  @IsArray() permissionList!: PermissionEntity[]
}
