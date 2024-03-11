import {
  ClassName, Dictionary, FieldName, Type,
} from '@/airpower/decorator/Custom'
import { FormField } from '@/airpower/decorator/FormField'
import { SearchField } from '@/airpower/decorator/SearchField'
import { TableField } from '@/airpower/decorator/TableField'
import { BaseEntity } from '@/base/BaseEntity'
import { RoleEntity } from '../role/RoleEntity'
import { UserSystemDictionary } from './UserSystemDictionary'
import { EntityConfig } from '@/airpower/decorator/EntityConfig'
import { IUser } from '@/airpower/interface/IUser'
import { Strings } from '@/config/Strings'

/**
 * # 用户实体
 */
@ClassName(Strings.get().User)
@EntityConfig({
  addTitle: Strings.get().AddUser,
})
export class UserEntity extends BaseEntity implements IUser {
  /**
   * # 邮箱
   */
  @FormField({
    email: true,
    requiredString: true,
  })
  @TableField({
    forceShow: true,
  })
  @SearchField()
  @FieldName(Strings.get().Email) email!: string

  /**
   * # 密码
   */
  @FormField({
    password: true,
  })
  @FieldName('密码') password!: string

  /**
   * # 昵称
   */
  @FormField({
    requiredString: true,
  })
  @TableField({
    forceShow: true,
  })
  @SearchField()
  @FieldName('昵称') nickname!: string

  /**
   * # 头像
   */
  @FieldName('头像') avatar!: string

  /**
   * # 手机
   */
  @FormField({
    mobilePhone: true,
    requiredString: true,
  })
  @TableField({
    forceShow: true,
  })
  @SearchField()
  @FieldName('手机') phone!: string

  /**
   * # 角色列表
   */
  @FieldName('角色')
  @TableField({
    payloadArray: true,
    payloadField: 'name',
  })
  @Type(RoleEntity, true) roleList!: RoleEntity[]

  /**
   * # 用户类别
   */
  @Dictionary(UserSystemDictionary)
  @TableField({
    showColor: true,
    width: 100,
    orderNumber: -100,
  })
  @FieldName('类别') isSystem!: boolean
}
