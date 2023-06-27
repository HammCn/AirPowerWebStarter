import { AirModel } from '@/airpower/base/AirModel'
import {
  Alias, Default, FieldPrefix, ToJson, Type,
} from '@/airpower/decorator/Custom'

@FieldPrefix('role_')
export class RoleEntity extends AirModel {
  name!: string

  id!: number

  @ToJson((role: RoleEntity) => (role.isAdmin ? 1 : 0))
  @Default(false)
  @Type(Boolean)
  @Alias('admin') isAdmin!: boolean
}
