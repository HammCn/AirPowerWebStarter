import { AirColor } from '@/airpower/enum/AirColor'
import { IRecord } from '@/airpower/interface/IRecord'

/**
 * # 禁用状态字典
 * @author Hamm
 */
export const DisableRecord: IRecord[] = [
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
]
