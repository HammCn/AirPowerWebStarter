import {
  Alias, Default, FieldPrefix, ToJson, Type,
} from '@/airpower/decorator/Custom'
import { BaseEntity } from './BaseEntity'

@FieldPrefix('role_')
export class RoleEntity extends BaseEntity {
  @ToJson((role: RoleEntity) => (role.isAdmin ? 1 : 0))
  @Default(false)
  @Type(Boolean)
  @Alias('admin') isAdmin!: boolean
}
