import { app } from '@/airpower'
import { AirConfig } from '@/airpower/config/AirConfig'

import { routes } from '@/config/routes'
import '@/assets/css/main.scss'

AirConfig.defaultHttpSuccessCode = 200000
AirConfig.autoPermission = false
app.use(AirConfig.createRouter(routes)).mount('#app')
