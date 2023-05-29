import { BaseAbstractService } from '@/base/BaseAbstractService'
import { MaterialEntity } from '@/entity/MaterialEntity'

/**
 * # 物料接口服务
 * @author Hamm
 */
export class MaterialService extends BaseAbstractService<MaterialEntity> {
  entityClass = MaterialEntity

  baseUrl = 'material'
}
