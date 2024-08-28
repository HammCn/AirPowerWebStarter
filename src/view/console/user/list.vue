<template>
  <APanel>
    <AToolBar
      :loading="isLoading"
      :entity="UserEntity"
      :service="UserService"
      @on-add="onAdd"
      @on-search="onSearch"
    />
    <ATable
      v-loading="isLoading"
      :data-list="response.list"
      :entity="UserEntity"
      :ctrl-width="150"
      show-enable-and-disable
      @on-edit="onEdit"
      @on-delete="onDelete"
      @on-enable="onEnable"
      @on-disable="onDisable"
    />
    <template #footerLeft>
      <APage
        :response="response"
        @on-change="onPageChanged"
      />
    </template>
  </APanel>
</template>

<script lang="ts" setup>
import {
  APage, APanel, ATable, AToolBar,
} from '@/airpower/component'
import { UserEntity } from '@/model/user/UserEntity'
import { UserService } from '@/model/user/UserService'
import { useAirTable } from '@/airpower/hook/useAirTable'
import { UserEditor } from './component'

import { AirDialog } from '@/airpower/helper/AirDialog'
import { UserSelector } from '@/view/console/user/component'

const {
  isLoading, response,
  onPageChanged, onDelete, onEdit, onAdd, onSearch, onEnable, onDisable,
} = useAirTable(UserEntity, UserService, {
  editView: UserEditor,
})

async function init() {
  const userList = await AirDialog.selectList(UserSelector)
  // eslint-disable-next-line no-console
  console.log(userList)
  const user = await AirDialog.select(UserSelector)
  // eslint-disable-next-line no-console
  console.log(user)
}

init()
</script>
<style scoped lang="scss"></style>
