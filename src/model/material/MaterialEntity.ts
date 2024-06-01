import {
  Alias, Dictionary, Field, Model, ToModel, Type,
} from '@/airpower/decorator/Custom'
import { EntityConfig } from '@/airpower/decorator/EntityConfig'
import { Form } from '@/airpower/decorator/FormField'
import { Search } from '@/airpower/decorator/SearchField'
import { Table } from '@/airpower/decorator/TableField'
import { IJson } from '@/airpower/interface/IJson'
import { BaseEntity } from '@/base/BaseEntity'
import { MaterialTypeEnum } from './MaterialTypeEnum'

/**
 * # 物料
 * @author Hamm
 */
@EntityConfig({
  // addTitle: '创建物料',
  // keywordSearchPlaceholder: '物料编码/名称搜索...',
})
@Model('物料')
export class MaterialEntity extends BaseEntity {
  /**
   * # 物料名称
   */
  @Table({
    forceShow: true,
    copyField: true,
  })
  @Search()
  @Form({
    requiredString: true,
  })
  @Type(String)
  @Alias('name')
  @Field('物料名称') materialName!: string

  /**
   * # 规格型号
   */
  @Table({
    emptyValue: '暂无信息',
  })
  @Search()
  @Form()
  @Alias('spc')
  @Field('规格型号') materialSpc!: string

  /**
   * # 物料类型
   */
  @Dictionary(MaterialTypeEnum)
  @Table({
    showColor: true,
    width: 100,
  })
  @Search()
  @Form({
    defaultValue: MaterialTypeEnum.PUBLIC.key,
    requiredNumber: true,
  })
  @Field('物料类型') materialType!: number

  /**
   * # 单位ID
   */
  @ToModel((obj: IJson) => obj.unitId || obj.unitInfo?.id || undefined)
  @Field('单位ID') unitId = 1

  @Table({
    orderNumber: 999,
    label: '重写的时间',
  })
  declare createTime: number
}
