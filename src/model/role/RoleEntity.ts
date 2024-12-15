import { Model } from '@/airpower/decorator/Model'
import { BaseEntity } from '@/base/BaseEntity'
import { MenuEntity } from '../menu/MenuEntity'
import { PermissionEntity } from '../permission/PermissionEntity'
import { Form } from '@/airpower/decorator/FormField'
import { Table } from '@/airpower/decorator/TableField'
import { Search } from '@/airpower/decorator/SearchField'
import { Field } from '@/airpower/decorator/Field'

/**
 * # 角色
 * @author Hamm.cn
 */
@Model({
  label: '角色',
})
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
  @Field({
    label: '角色名称',
  })
    name!: string

  /**
   * # 菜单列表
   */
  @Field({
    type: MenuEntity,
    array: true,
  })
    menuList!: MenuEntity[]

  /**
   * # 权限列表
   */
  @Field({
    type: PermissionEntity,
    array: true,
  })
    permissionList!: PermissionEntity[]

  @Table({
    removed: false,
  })
  declare isDisabled: boolean
}
