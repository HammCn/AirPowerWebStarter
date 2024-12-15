import { Form } from '@/airpower/decorator/FormField'
import { Search } from '@/airpower/decorator/SearchField'
import { Table } from '@/airpower/decorator/TableField'
import { BaseEntity } from '@/base/BaseEntity'
import { RoleEntity } from '../role/RoleEntity'
import { IUser } from '@/airpower/interface/IUser'
import { AirDesensitizeType } from '@/airpower/enum/AirDesensitizeType'
import { Field } from '@/airpower/decorator/Field'
import { Strings } from '@/config/Strings'

/**
 * # 用户实体
 */
export class UserEntity extends BaseEntity implements IUser {
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
  @Field({
    label: '昵称',
  })
    nickname!: string

  /**
   * # 手机
   */
  @Form({
    mobilePhone: true,
    requiredString: true,
    defaultValue: '13888888888',
  })
  @Table({
    forceShow: true,
    phone: true,
    copyField: true,
    desensitize: AirDesensitizeType.MOBILE,
  })
  @Search()
  @Field({
    label: '手机',
  })
    phone!: string

  /**
   * # 邮箱
   */
  @Form({
    email: true,
    requiredString: true,
  })
  @Table({
    forceShow: true,
    copyField: true,
    desensitize: AirDesensitizeType.EMAIL,
  })
  @Search()
  @Field({
    label: Strings.get().Email || '邮箱',
  })
    email!: string

  /**
   * # 头像
   */
  @Field({
    label: '头像',
  })
    avatar!: string

  /**
   * # 密码
   */
  @Form({
    password: true,
  })
  @Field({
    label: '密码',
  })
    password!: string

  /**
   * # 角色列表
   */
  @Table({
    payloadArray: true,
    payloadField: 'name',
  })
  @Field({
    type: RoleEntity,
    array: true,
    label: '角色',
  }) roleList!: RoleEntity[]

  @Table({
    removed: false,
  })
  declare isDisabled: boolean

  /**
   * # 验证码
   */
  code!: string

  /**
   * # 所属应用AppKey
   */
  appKey!: string

  /**
   * # 设置邮箱
   * @param email 邮箱
   * @returns
   */
  setEmail(email: string): this {
    this.email = email
    return this
  }
}
