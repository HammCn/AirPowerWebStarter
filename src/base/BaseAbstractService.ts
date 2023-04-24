import { AirEntity } from '@/airpower/dto/AirEntity'
import { AirAbstractService } from '@/airpower/service/AirAbstractService'

/**
 * # 抽象服务基类
 * @author Hamm
 */
export abstract class BaseAbstractService<E extends AirEntity> extends AirAbstractService<E> {
}
