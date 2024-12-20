import { BaseEntity } from '@/base/BaseEntity'
import { Form } from '@/airpower/decorator/FormField'
import { Table } from '@/airpower/decorator/TableField'
import { Model } from '@/airpower/decorator/Model'
import { Field } from '@/airpower/decorator/Field'

@Model({
  label: '供应商',
})
export class SupplierEntity extends BaseEntity {
  /**
   * # 供应商编码
   */
  @Table({
    copyField: true,
    forceShow: true,
    orderNumber: 99,
  })
  @Form({
    orderNumber: 99,
    requiredString: true,
  })
  @Field({
    label: '供应商编码',
  })
    code!: string

  /**
   * # 供应商名称
   */
  @Table({
    forceShow: true,
    sortable: 'custom',
  })
  @Form({
    orderNumber: 98,
    requiredString: true,
  })
  @Field({
    label: '供应商名称',
  })
    name!: string

  /**
   * # 联系电话
   */
  @Table()
  @Form({
    mobilePhone: true,
  })
  @Field({
    label: '联系电话',
  })
    phone!: string
}
