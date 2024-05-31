import { AirEnum } from '@/airpower/base/AirEnum'
import { AirColor } from '@/airpower/enum/AirColor'

export class PermissionSystemEnum extends AirEnum<boolean> {
  static readonly NORMAL = new PermissionSystemEnum(false, '普通权限', AirColor.NORMAL)

  static readonly SYSTEM = new PermissionSystemEnum(true, '系统权限', AirColor.DANGER)
}
