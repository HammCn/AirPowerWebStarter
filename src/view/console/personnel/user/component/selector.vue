<template>
  <ASelector
    :editor="UserEditor"
    :entity="UserEntity"
    :field-list="UserEntity.getTableFieldConfigList().filter(item=>!['isDisabled'].includes(item.key))"
    :props="props"
    :service="UserService"
  >
    <template #nickname="{ data }">
      {{ data.nickname }}
    </template>
  </ASelector>
</template>

<script lang="ts" setup>
import { ASelector } from '@/airpower/component'
import { airPropsSelector } from '@/airpower/config/AirProps'
import { UserEntity } from '@/model/personnel/user/UserEntity'
import { UserService } from '@/model/personnel/user/UserService'

import { UserEditor } from './index'

const filter = new UserEntity()
filter.isDisabled = false
const props = defineProps(airPropsSelector<UserEntity>(new UserEntity().setDisable(false).setEmail('admi1n@hamm')))

</script>
<style lang="scss" scoped></style>
