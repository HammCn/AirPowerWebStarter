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
      :data-list="list"
      hide-select
      :entity="UserEntity"
      :ctrl-width="105"
      @on-edit="onEdit"
      @on-delete="onDelete"
    />
  </APanel>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import {
  APanel, ATable, AToolBar,
} from '@/airpower/component'
import { AirDialog } from '@/airpower/helper/AirDialog'
import { UserEditor } from './component'
import { AirRequestPage } from '@/airpower/model/AirRequestPage'
import { UserEntity } from '@/model/user/UserEntity'
import { UserService } from '@/model/user/UserService'

const isLoading = ref(false)
const request = ref(new AirRequestPage(UserEntity))
const list = ref([] as UserEntity[])

async function getList() {
  list.value = await UserService.create(isLoading).getList(request.value)
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
