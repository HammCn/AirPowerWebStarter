import {
  Field,
  Model,
  Type,
} from '@/airpower/decorator/Custom'
import { EntityConfig } from '@/airpower/decorator/EntityConfig'
import { BaseEntity } from '@/base/BaseEntity'
import { MenuEntity } from '../menu/MenuEntity'
import { PermissionEntity } from '../permission/PermissionEntity'
import { Form } from '@/airpower/decorator/FormField'
import { Table } from '@/airpower/decorator/TableField'
import { Search } from '@/airpower/decorator/SearchField'

/**
 * # 角色
 * @author Hamm.cn
 */
@EntityConfig({
})
@Model('角色')
export class RoleEntity extends BaseEntity {
  /**
   * # 角色名称
   */
  @Table({
    forceShow: true,
  })
  @Search()
  @Form({
    requiredString: true,
  })
  @Type(String)
  @Field('角色名称') name!: string

  /**
   * # 菜单列表
   */
  @Type(MenuEntity, true) menuList!: MenuEntity[]

  /**
   * # 权限列表
   */
  @Type(PermissionEntity, true) permissionList!: PermissionEntity[]
}
