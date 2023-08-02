<template>
  <APanel>
    <AToolBar
      :loading="isLoading"
      :entity="UserEntity"
      :service="UserService"
      @on-add="onAdd()"
      @on-search="request = $event; getList()"
    />
    <ATable
      v-loading="isLoading"
      :data-list="response.list"
      hide-select
      :entity="UserEntity"
      :ctrl-width="80"
      :disable-delete="(row: UserEntity) => row.isSystem"
      @on-edit="onEdit"
      @on-delete="onDelete"
    />
    <template #footerRight>
      <APage
        :response="response"
        @on-change="request.page = $event; getList()"
      />
    </template>
  </APanel>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import {
  APanel, ATable, AToolBar, APage,
} from '@/airpower/component'
import { AirDialog } from '@/airpower/helper/AirDialog'
import { UserEditor } from './component'
import { AirRequestPage } from '@/airpower/model/AirRequestPage'
import { UserEntity } from '@/model/user/UserEntity'
import { UserService } from '@/model/user/UserService'
import { AirResponsePage } from '@/airpower/model/AirResponsePage'

const isLoading = ref(false)
const request = ref(new AirRequestPage(UserEntity))
const response = ref(new AirResponsePage<UserEntity>())

async function getList() {
  response.value = await UserService.create(isLoading).getPage(request.value)
}

async function onEdit(row: UserEntity) {
  await AirDialog.show(UserEditor, row)
  getList()
}

async function onDelete(data: UserEntity) {
  await UserService.create(isLoading).delete(data.id, '删除权限成功')
  getList()
}

async function onAdd() {
  await AirDialog.show(UserEditor)
  getList()
}
getList()

</script>
<style scoped lang="scss"></style>
