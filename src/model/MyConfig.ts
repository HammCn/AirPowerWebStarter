import { AirEnum } from '@/airpower/base/AirEnum'
import { IFieldConfig } from '@/airpower/interface/decorators/IFieldConfig'
import { AirAny } from '@/airpower/type/AirType'

export interface MyConfig<E extends AirEnum<AirAny> = AirEnum<AirAny>> extends IFieldConfig<E> {

  hello?: string
}
