import { Expose, Type } from 'class-transformer'
import { BaseAbstractTreeEntity } from '@/base/BaseAbstractTreeEntity'

/**
 * # 部门实体
 * @author Hamm
 */
export class DepartmentEntity extends BaseAbstractTreeEntity<DepartmentEntity> {
  /**
   * # 下级部门
   */
  @Type(() => DepartmentEntity)
  @Expose() children: DepartmentEntity[] = []
}
