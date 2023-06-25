import { Expose, Type } from 'class-transformer'
import { BaseEntity } from '@/base/BaseEntity'
import { ITree } from '@/airpower/interface/ITree'

/**
 * # 部门实体
 * @author Hamm
 */
export class DepartmentEntity extends BaseEntity implements ITree {
  @Expose() name!: string

  /**
   * # 下级部门
   */
  @Type(() => DepartmentEntity)
  @Expose() children: this[] = []
}
