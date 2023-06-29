import { app } from '@/airpower'
import { AirConfig } from '@/airpower/config/AirConfig'

import { routes } from '@/config/routes'
import '@/assets/css/main.scss'

import { runTest } from '@/test'
import { MaterialEntity } from './model/entity/MaterialEntity'

AirConfig.successCode = 200000
AirConfig.autoPermission = false
app.use(AirConfig.createRouter(routes)).mount('#app')

runTest()

// eslint-disable-next-line no-console
console.log(new MaterialEntity())
