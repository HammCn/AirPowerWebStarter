import { AirColor } from '@/airpower/enum/AirColor'
import { AirRecord } from '@/airpower/model/AirRecord'

/**
 * # 禁用状态字典
 * @author Hamm
 */
export const DisableRecord = AirRecord.create([
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
