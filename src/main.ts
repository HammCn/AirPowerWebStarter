import { app } from '@/airpower'
import { AirConfig } from '@/airpower/config/AirConfig'

import { routes } from '@/config/routes'
import '@/assets/css/main.scss'
import { MaterialEntity } from './model/entity/MaterialEntity'

AirConfig.successCode = 200000
AirConfig.autoPermission = false
app.use(AirConfig.createRouter(routes)).mount('#app')

const material = new MaterialEntity()
// eslint-disable-next-line no-console
console.log(material)
