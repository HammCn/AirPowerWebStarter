import {
  ClassName, Dictionary, FieldName, IsArray, Type,
} from '@/airpower/decorator/Custom'
import { FormField } from '@/airpower/decorator/FormField'
import { SearchField } from '@/airpower/decorator/SearchField'
import { TableField } from '@/airpower/decorator/TableField'
import { BaseEntity } from '@/base/BaseEntity'
import { RoleEntity } from '../role/RoleEntity'
import { UserSystemDictionary } from './UserSystemDictionary'
import { EntityConfig } from '@/airpower/decorator/EntityConfig'

@ClassName('用户')
@EntityConfig({
  addTitle: '添加用户',
})
export class UserEntity extends BaseEntity {
  @FormField({
    email: true,
    requiredString: true,
  })
  @TableField({
    forceShow: true,
  })
  @SearchField()
  @FieldName('邮箱') email!: string

  @FormField({
    password: true,
  })
  @FieldName('密码') password!: string

  @FormField({
    requiredString: true,
  })
  @TableField({
    forceShow: true,
  })
  @SearchField()
  @FieldName('昵称') nickname!: string

  @FieldName('角色')
  @TableField({
    payloadArray: true,
    payloadField: 'name',
  })
  @Type(RoleEntity)
  @IsArray() roleList!: RoleEntity[]

  @Dictionary(UserSystemDictionary)
  @TableField({
    showColor: true,
    width: 100,
    orderNumber: -100,
  })
  @FieldName('类别') isSystem!: boolean
}
