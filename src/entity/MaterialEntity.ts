/* eslint-disable no-unused-vars */
import { Expose } from 'class-transformer'
import { ClassName, FieldName } from '@/airpower/decorator/CustomName'
import { EntityConfig } from '@/airpower/decorator/EntityConfig'
import { FormField } from '@/airpower/decorator/FormField'
import { SearchField } from '@/airpower/decorator/SearchField'
import { TableField } from '@/airpower/decorator/TableField'
import { AirColor } from '@/airpower/enum/AirColor'
import { IRecord } from '@/airpower/interface/IRecord'
import { BaseEntity } from '@/base/BaseEntity'

export enum MaterialType {
  PUBLIC = 1,
  PRIVATE = 2
}
export const MaterialTypeRecord: IRecord[] = [
  {
    key: MaterialType.PUBLIC,
    label: '公共物料',
    color: AirColor.SUCCESS,
  },
  {
    key: MaterialType.PRIVATE,
    label: '私有物料',
    color: AirColor.NORMAL,
  },
]

/**
 * 用户实体类
 */
@ClassName('物料')
@EntityConfig({
  addTitle: '创建物料',
  keywordSearchPlaceholder: '物料编码/名称搜索...',
})
export class MaterialEntity extends BaseEntity {
  @FieldName('物料名称')
  @TableField({
    forceShow: true,
  })
  @SearchField()
  @FormField()
  @Expose() name!: string

  @FieldName('规格型号')
  @TableField({
    isCopyField: true,
  })
  @SearchField()
  @FormField()
  @Expose() spc!: string

  @FieldName('物料类型')
  @TableField({
    enumRecord: MaterialTypeRecord,
    showStatus: true,
    width: 100,
  })
  @FormField({
    enumRecord: MaterialTypeRecord,
    defaultValue: MaterialType.PUBLIC,
  })
  @SearchField({
    enumRecord: MaterialTypeRecord,
  })
  @Expose() materialType!: MaterialType

  @Expose() unitId = 1
}
