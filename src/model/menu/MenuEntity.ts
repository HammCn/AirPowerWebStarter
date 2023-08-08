import {
  ClassName,
  FieldName, IsArray, Type,
} from '@/airpower/decorator/Custom'
import { EntityConfig } from '@/airpower/decorator/EntityConfig'
import { FormField } from '@/airpower/decorator/FormField'
import { SearchField } from '@/airpower/decorator/SearchField'
import { TableField } from '@/airpower/decorator/TableField'
import { BaseEntity } from '@/base/BaseEntity'
import { IMenu } from '@/airpower/interface/IMenu'

/**
 * # 菜单
 * @author Hamm
 */
@EntityConfig({
  addChildPermission: 'add',
})
@ClassName('菜单')
export class MenuEntity extends BaseEntity implements IMenu {
  @TableField({
    forceShow: true,
  })
  @SearchField()
  @FormField({
    requiredString: true,
  })
  @Type(String)
  @FieldName('菜单名称') name!: string

  @TableField({
    copyField: true,
    forceShow: true,
  })
  @FormField({
    requiredString: true,
  })
  @Type(String)
  @FieldName('菜单路径') path!: string

  @FormField()
  @Type(String)
  @FieldName('菜单图标') icon!: string

  @TableField({
    copyField: true,
  })
  @FormField()
  @Type(String)
  @FieldName('组件地址') component!: string

  @FormField()
  @TableField({
    width: 100,
  })
  @Type(String)
  @FieldName('排序编号') orderNo!: number

  @FieldName('父级ID') parentId!: number

  // eslint-disable-next-line no-use-before-define
  @Type(MenuEntity)
  @IsArray() children!: this[]

  // eslint-disable-next-line no-use-before-define
  @Type(MenuEntity) parent!: this

  @TableField({
    removed: true,
  })
  declare createTime: number

  @TableField({
    removed: true,
  })
  declare isDisabled: boolean
}
