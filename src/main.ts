import { AirI18n } from './airpower/helper/AirI18n'
import { ChineseSimplified } from './config/i18n/ChineseSimplified'
import { English } from './config/i18n/English'

import { app } from '@/airpower'
import { AirConfig } from '@/airpower/config/AirConfig'

import { createRoutes } from '@/config/routes'
import '@/assets/css/main.scss'

AirI18n.init(ChineseSimplified, English)

app.use(AirConfig.createRouter(createRoutes())).mount('#app')
