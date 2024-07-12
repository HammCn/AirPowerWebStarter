<template>
  <ASelector
    :entity="UserEntity"
    :service="UserService"
    :props="props"
    :field-list="UserEntity.getTableFieldConfigList().filter(item=>['email','isDisabled'].includes(item.key))"
    :editor="UserEditor"
  >
    <template #nickname="{ data }">
      {{ data.nickname }}
    </template>
  </ASelector>
</template>

<script lang="ts" setup>
import { ASelector } from '@/airpower/component'
import { airPropsSelector } from '@/airpower/config/AirProps'
import { UserEntity } from '@/model/user/UserEntity'
import { UserService } from '@/model/user/UserService'

import { UserEditor } from '.'

const props = defineProps(airPropsSelector<UserEntity>())

</script>
<style scoped lang="scss"></style>
