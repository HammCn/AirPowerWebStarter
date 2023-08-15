import { UserEntity } from './UserEntity'

export class UserRequestVo extends UserEntity {
  code!: string

  appKey!: string
}
