import { app } from '@/airpower'
import { AirConfig } from '@/airpower/AirConfig'

import { routes } from '@/config/routes'

AirConfig.defaultHttpSuccessCode = 200000
AirConfig.autoPermission = false
app.use(AirConfig.createRouter(routes)).mount('#app')
