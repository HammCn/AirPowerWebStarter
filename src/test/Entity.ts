/* eslint-disable no-console */
/* eslint-disable no-use-before-define */
/* eslint-disable max-classes-per-file */
import { AirEntity } from '@/airpower/base/AirEntity'
import {
  Alias,
  Default, FieldPrefix, IgnorePrefix, ToJson, Type,
} from '@/airpower/decorator/Custom'

export class TestRoleEntity extends AirEntity {
  roleName!: string

  @Default(1999)
  @Alias('roleType') type!: number
}

@FieldPrefix('user_')
export class TestUserEntity extends AirEntity {
  name!: string

  @Type(String)
  @IgnorePrefix() phoneNumber!: string

  @ToJson((model: TestUserEntity) => (model.isMale ? 1 : 0))
  @Type(Boolean) isMale!: boolean

  @Default(0)
  @Type(Number) money!: number

  @Type(TestRoleEntity) role!: TestRoleEntity

  @Default(18)
    age!: number
}

export function test() {
  const json = {
    user_name: 'Hamm', phoneNumber: 17666666666, user_isMale: null, user_money: '0123.213', user_role: { roleName: '管理员', roleType: null },
  }
  console.log('后端返回的数据')
  console.log(JSON.stringify(json))
  const instance = TestUserEntity.fromJson(json)
  console.log('前端转换的数据')
  console.log(instance)
  const newinstance = new TestUserEntity()
  newinstance.age = 18
  newinstance.isMale = true
  newinstance.phoneNumber = '17600000000'
  newinstance.role = new TestRoleEntity()
  newinstance.role.roleName = '游客'
  newinstance.role.type = 1
  console.log('前端生成的数据')
  console.log(newinstance)

  console.log('发送给后端的数据')
  console.log(JSON.stringify(newinstance.toJson()))
}
