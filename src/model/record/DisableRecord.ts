import { AirColor } from '@/airpower/enum/AirColor'
import { AirRecordArray } from '@/airpower/model/extend/AirRecordArray'

/**
 * # 禁用状态字典
 * @author Hamm
 */
export const DisableRecord = AirRecordArray.create([
  {
    key: true,
    label: '禁用',
    color: AirColor.DANGER,
  },
  {
    key: false,
    label: '正常',
    color: AirColor.SUCCESS,
  },
])
