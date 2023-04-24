import { Expose } from 'class-transformer'
import { BaseAbstractTreeEntity } from '@/base/BaseTreeEntity'

/**
 * 实体
 */
export class DepartmentEntity extends BaseAbstractTreeEntity<DepartmentEntity> {
  /**
   * # 部门名称
   */
  @Expose() name!: string

  /**
   * # 下级部门
   */
  @Expose() children: DepartmentEntity[] = []
}
