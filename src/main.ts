import { app } from '@/airpower'
import { AirConfig } from '@/airpower/config/AirConfig'

import { routes } from '@/config/routes'
import '@/assets/css/main.scss'
import { AirDialog } from './airpower/helper/AirDialog'
import { RoleSelector } from './view/console/role/component'

AirConfig.successCode = 200000
AirConfig.unAuthorizeCode = 401000
AirConfig.autoPermission = true
app.use(AirConfig.createRouter(routes)).mount('#app')

async function test() {
  await AirDialog.select(RoleSelector)
  await AirDialog.selectList(RoleSelector)
}

test()
