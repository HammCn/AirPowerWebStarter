import { AirAbstractService } from '@/airpower/base/AirAbstractService'
import { BaseEntity } from './BaseEntity'

/**
 * # 抽象服务基类
 * @author Hamm
 */
export abstract class AbstractBaseService<E extends BaseEntity> extends AirAbstractService<E> {
}