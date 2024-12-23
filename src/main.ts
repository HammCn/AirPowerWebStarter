import { app } from '@/airpower'
import { AirConfig } from '@/airpower/config/AirConfig'
import { AirI18n } from '@/airpower/helper/AirI18n'
import { ChineseSimplified } from '@/config/i18n/ChineseSimplified'
import { English } from '@/config/i18n/English'

import { routes } from '@/config/routes'
import '@/assets/css/main.scss'
import { AirRouter } from './airpower/helper/AirRouter'

AirConfig.product = 'AirPower'
AirI18n.init(ChineseSimplified, English)

app.use(AirRouter.createRouter(routes))
  .mount('#app')

window.addEventListener('storage', (event) => {
  if (event.key === AirConfig.authorizationHeaderKey) {
    if (event.newValue) {
      window.location.replace('/console')
    } else {
      window.location.replace('/login')
    }
  }
})
