import { FieldName } from '@/airpower/decorator/Custom'
import { FormField } from '@/airpower/decorator/FormField'
import { BaseEntity } from '@/base/BaseEntity'

export class UserEntity extends BaseEntity {
  @FormField()
  @FieldName('邮箱') email!: string

  @FormField()
  @FieldName('密码') password!: string
}
