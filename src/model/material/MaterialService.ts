import { AbstractBaseService } from '@/base/AbstractBaseService'
import { MaterialEntity } from './MaterialEntity'

/**
 * # 物料接口服务
 * @author Hamm.cn
 */
export class MaterialService extends AbstractBaseService<MaterialEntity> {
  baseUrl = 'material'

  entityClass = MaterialEntity
}
