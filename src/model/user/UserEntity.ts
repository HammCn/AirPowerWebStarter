import {
  Field,
  Type,
} from '@/airpower/decorator/Custom'
import { Form } from '@/airpower/decorator/FormField'
import { Search } from '@/airpower/decorator/SearchField'
import { Table } from '@/airpower/decorator/TableField'
import { BaseEntity } from '@/base/BaseEntity'
import { RoleEntity } from '../role/RoleEntity'
import { IUser } from '@/airpower/interface/IUser'
import { Strings } from '@/config/Strings'

/**
 * # 用户实体
 */
export class UserEntity extends BaseEntity implements IUser {
  /**
   * # 邮箱
   */
  @Form({
    email: true,
    requiredString: true,
  })
  @Table({
    forceShow: true,
  })
  @Search()
  @Field(Strings.get().Email || '邮箱') email!: string

  /**
   * # 密码
   */
  @Form({
    password: true,
  })
  @Field('密码') password!: string

  /**
   * # 昵称
   */
  @Form({
    requiredString: true,
  })
  @Table({
    forceShow: true,
  })
  @Search()
  @Field('昵称') nickname!: string

  /**
   * # 头像
   */
  @Field('头像') avatar!: string

  /**
   * # 手机
   */
  @Form({
    mobilePhone: true,
    requiredString: true,
  })
  @Table({
    forceShow: true,
    phone: true,
  })
  @Search()
  @Field('手机') phone!: string

  /**
   * # 角色列表
   */
  @Field('角色')
  @Table({
    payloadArray: true,
    payloadField: 'name',
  })
  @Type(RoleEntity, true) roleList!: RoleEntity[]

  @Table({
    removed: false,
  })
  declare isDisabled: boolean

  code!: string
}
