import { AirColor } from '@/airpower/enum/AirColor'
import { IRecord } from '@/airpower/interface/IRecord'
import { MaterialType } from '@/model/enum/MaterialType'

/**
 * # 物料类型枚举字典
 * @author Hamm
 */
export const MaterialTypeRecord: IRecord[] = [
  {
    key: MaterialType.PUBLIC,
    label: '公共物料',
    color: AirColor.SUCCESS,
  },
  {
    key: MaterialType.PRIVATE,
    label: '私有物料',
    color: AirColor.NORMAL,
  },
]
