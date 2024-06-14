import { AirEnum } from '@/airpower/base/AirEnum'
import { AirColor } from '@/airpower/enum/AirColor'

/**
 * # 物料类型枚举
 *
 * @author Hamm.cn
 */
export class MaterialTypeEnum extends AirEnum {
  /**
   * # 公共物料
   */
  static readonly PUBLIC = new MaterialTypeEnum(1, '公共物料', AirColor.SUCCESS)

  /**
   * # 私有物料
   */
  static readonly PRIVATE = new MaterialTypeEnum(2, '私有物料', AirColor.NORMAL)
}
