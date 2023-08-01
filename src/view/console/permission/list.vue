<template>
  <APanel>
    <AToolBar
      :loading="isLoading"
      :entity="PermissionEntity"
      :service="PermissionService"
      @on-add="onAdd()"
      @on-search="request = $event; getList()"
    />
    <ATable
      v-loading="isLoading"
      :data-list="list"
      hide-select
      show-add
      :entity="PermissionEntity"
      :ctrl-width="105"
      :default-expand-all="false"
      :disable-delete="(row: PermissionEntity) => row.isSystem"
      :disable-edit="(row: PermissionEntity) => row.isSystem"
      @on-edit="onEdit"
      @on-delete="onDelete"
      @on-add="onRowAdd"
    />
  </APanel>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import {
  APanel, ATable, AToolBar,
} from '@/airpower/component'
import { AirDialog } from '@/airpower/helper/AirDialog'
import { PermissionEditor } from './component'
import { AirRequestPage } from '@/airpower/model/AirRequestPage'
import { PermissionEntity } from '@/model/permission/PermissionEntity'
import { PermissionService } from '@/model/permission/PermissionService'

const isLoading = ref(false)
const request = ref(new AirRequestPage(PermissionEntity))
const list = ref([] as PermissionEntity[])

async function getList() {
  list.value = await PermissionService.create(isLoading).getList(request.value)
}

async function onRowAdd(row: PermissionEntity) {
  const entity = new PermissionEntity()
  entity.parentId = row.id
  entity.parent = row
  await AirDialog.show(PermissionEditor, entity)
  getList()
}

async function onEdit(row: PermissionEntity) {
  await AirDialog.show(PermissionEditor, row)
  getList()
}

async function onDelete(data: PermissionEntity) {
  await PermissionService.create(isLoading).delete(data.id, '删除权限成功')
  getList()
}

async function onAdd() {
  await AirDialog.show(PermissionEditor)
  getList()
}
getList()

</script>
<style scoped lang="scss"></style>
