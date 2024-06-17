import { AirEnum } from '@/airpower/base/AirEnum'
import { AirColor } from '@/airpower/enum/AirColor'

/**
 * # 权限类型
 *
 * @author Hamm.cn
 */
export class PermissionSystemEnum extends AirEnum<boolean> {
  /**
   * # 普通权限
   */
  static readonly NORMAL = new PermissionSystemEnum(false, '普通权限', AirColor.NORMAL)

  /**
   * # 系统权限
   */
  static readonly SYSTEM = new PermissionSystemEnum(true, '系统权限', AirColor.DANGER)
}
