import { AbstractBaseService } from '@/base/AbstractBaseService'
import { MaterialEntity } from '@/model/entity/MaterialEntity'

/**
 * # 物料接口服务
 * @author Hamm
 */
export class MaterialService extends AbstractBaseService<MaterialEntity> {
  entityClass = MaterialEntity

  baseUrl = 'material'
}
