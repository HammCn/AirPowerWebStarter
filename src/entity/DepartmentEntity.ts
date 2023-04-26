import { Expose, Type } from 'class-transformer'
import { BaseAbstractTreeEntity } from '@/base/BaseTreeEntity'

/**
 * 实体
 */
export class DepartmentEntity extends BaseAbstractTreeEntity<DepartmentEntity> {
  /**
   * # 下级部门
   */
  @Type(() => DepartmentEntity)
  @Expose() children: DepartmentEntity[] = []
}
