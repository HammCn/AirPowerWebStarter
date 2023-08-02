import { AbstractBaseService } from '@/base/AbstractBaseService'
import { RoleEntity } from './RoleEntity'

/**
 * # 角色接口服务
 * @author Hamm
 */
export class RoleService extends AbstractBaseService<RoleEntity> {
  baseUrl = 'role'

  entityClass = RoleEntity
}
