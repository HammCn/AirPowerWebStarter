import { app } from '@/airpower'
import { AirConfig } from '@/airpower/config/AirConfig'

import { routes } from '@/config/routes'
import '@/assets/css/main.scss'

import { runTest } from '@/test'
import { MaterialEntity } from './model/entity/MaterialEntity'
import { MaterialTypeRecord } from './model/record/MaterialTypeRecord'
import { DisableRecord } from './model/record/DisableRecord'

AirConfig.successCode = 200000
AirConfig.autoPermission = false
app.use(AirConfig.createRouter(routes)).mount('#app')

runTest()

// eslint-disable-next-line no-console
console.log(new MaterialEntity())

console.log(MaterialTypeRecord.get(2).other)

console.log(DisableRecord.get(true).color)
