/* eslint-disable no-console */
import { MaterialTypeDictionary } from '@/model/dictionary/MaterialTypeDictionary'
import { RoleEntity } from './RoleEntity'
import { UserEntity } from './UserEntity'
import { MaterialType } from '@/model/enum/MaterialType'

export function runTest() {
  const entity = new UserEntity()
  entity.id = 2
  entity.name = 'Hamm'
  entity.phoneNumber = '17666666666'
  entity.isDisabled = true
  const role = new RoleEntity()
  role.name = '管理员'
  role.id = 10085
  entity.role = role
  // entity.roleList = [role.copy(), role.copy()]
  const json = entity.copy().toJson()
  json.user_id += ''
  json.user_roleList = null
  console.log('原始对象', json)
  const newEntity = UserEntity.fromJson(json)
  newEntity.id = 22
  console.log('实体对象', newEntity)
  console.log('原始实体', entity)

  console.log('MaterialTypeDictionary', MaterialTypeDictionary)
  console.log('MaterialTypeDictionary.getLabel(MaterialType.PRIVATE)', MaterialTypeDictionary.getLabel(MaterialType.PRIVATE))
  console.log('MaterialTypeDictionary.getColor(MaterialType.PRIVATE)', MaterialTypeDictionary.getColor(MaterialType.PRIVATE))
}
