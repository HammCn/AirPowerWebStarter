import { BaseAbstractService } from '@/base/BaseAbstractService'
import { MaterialEntity } from '@/entity/MaterialEntity'

export class MaterialService extends BaseAbstractService<MaterialEntity> {
  entityClass = MaterialEntity

  baseUrl = 'material'
}
