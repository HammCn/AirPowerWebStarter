import { AirColor } from '@/airpower/enum/AirColor'
import { MaterialType } from '@/model/enum/MaterialType'
import { IMaterialTypeDictionary } from '../IMaterialTypeDictionary'
import { AirDictionaryArray } from '@/airpower/model/extend/AirDictionaryArray'

/**
 * # 物料类型枚举字典
 * @author Hamm
 */
export const MaterialTypeDictionary = AirDictionaryArray.createCustom<IMaterialTypeDictionary>([
  {
    key: MaterialType.PUBLIC,
    label: '公共物料',
    color: AirColor.SUCCESS,
    other: 1,
  },
  {
    key: MaterialType.PRIVATE,
    label: '私有物料',
    color: AirColor.NORMAL,
    other: 2,
  },
])
