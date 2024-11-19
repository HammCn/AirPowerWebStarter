import { Model } from '@/airpower/decorator/Model'
import { Form } from '@/airpower/decorator/FormField'
import { Search } from '@/airpower/decorator/SearchField'
import { Table } from '@/airpower/decorator/TableField'
import { IJson } from '@/airpower/interface/IJson'
import { BaseEntity } from '@/base/BaseEntity'
import { MaterialTypeEnum } from './MaterialTypeEnum'
import { Field, ToModel } from '@/airpower/decorator/Field'

/**
 * # 物料
 * @author Hamm.cn
 */
@Model({
  label: '物料',
})
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
  @Field({
    label: '物料名称',
    alias: 'name',
    type: String,
  }) materialName!: string

  /**
   * # 规格型号
   */
  @Table({
    emptyValue: '暂无信息',
  })
  @Search()
  @Form()
  @Field({
    alias: 'spc',
    label: '规格型号',
  })
    materialSpc!: string

  /**
   * # 物料类型
   */
  @Table({
    showColor: true,
    width: 100,
  })
  @Search()
  @Form({
    defaultValue: MaterialTypeEnum.PUBLIC.key,
    requiredNumber: true,
  })
  @Field({
    label: '物料类型',
    dictionary: MaterialTypeEnum,
  }) materialType!: number

  /**
   * # 单位ID
   */
  @ToModel((obj: IJson) => obj.unitId || obj.unitInfo?.id || undefined)
  @Field({
    label: '单位ID',
  })
    unitId = 1

  @Table({
    orderNumber: 999,
    label: '重写的时间',
  })
  declare createTime: number
}
