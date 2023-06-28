import {
  Alias,
  Default, FieldPrefix, IgnorePrefix, IsArray, ToJson, Type,
} from '@/airpower/decorator/Custom'
import { RoleEntity } from './RoleEntity'
import { BaseEntity } from './BaseEntity'

@FieldPrefix('user_')
export class UserEntity extends BaseEntity {
  @ToJson((user: UserEntity) => parseInt(user.phoneNumber))
  @Type(String)
  @IgnorePrefix()
    phoneNumber!: string

  @ToJson((user: UserEntity) => (user.isDisabled ? 1 : 0))
  @Type(Boolean)
  @Alias('disabled')
  @Default(false)
    isDisabled!: boolean

  @ToJson((user:UserEntity) => user.money.toString())
  @Default(0)
  @Type(Number)
    money!: number

  @Type(RoleEntity) role!: RoleEntity

  @Type(RoleEntity)
  @Default([])
  @IsArray()
    roleList!: RoleEntity[]
}
