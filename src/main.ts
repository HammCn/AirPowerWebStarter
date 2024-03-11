import { AirI18n } from './airpower/helper/AirI18n'
import { AirLanguage } from './airpower/enum/AirLanguage'
import { ChineseSimplified } from './config/i18n/ChineseSimplified'
import { English } from './config/i18n/English'

import { app } from '@/airpower'
import { AirConfig } from '@/airpower/config/AirConfig'

import { routes } from '@/config/routes'
import '@/assets/css/main.scss'

AirI18n.init(ChineseSimplified, English)
AirI18n.setCurrentLanguage(AirLanguage.English)

app.use(AirConfig.createRouter(routes)).mount('#app')
