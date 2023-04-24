import { Expose } from 'class-transformer'
import { BaseEntity } from '@/base/BaseEntity'

/**
 * 实体
 */
export class RoleEntity extends BaseEntity {
  /**
   * 角色名称
   */
  @Expose() roleName!: string
}
