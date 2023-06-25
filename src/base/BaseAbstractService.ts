import { AirAbstractService } from '@/airpower/base/AirAbstractBaseService'
import { BaseEntity } from './BaseEntity'

/**
 * # 抽象服务基类
 * @author Hamm
 */
export abstract class BaseAbstractService<E extends BaseEntity> extends AirAbstractService<E> {
}
