import { FieldName } from '@/airpower/decorator/Custom'
import { UserEntity } from './UserEntity'
import { FormField } from '@/airpower/decorator/FormField'

export class UserRegVo extends UserEntity {
  @FormField({
    isRequiredString: '请填写收到的邮箱验证码',
  })
  @FieldName('验证码') code!: string
}
