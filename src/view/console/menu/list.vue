<template>
  <APanel>
    <AToolBar
      :loading="isLoading"
      :entity="MenuEntity"
      :service="MenuService"
      @on-add="onAdd()"
      @on-search="request = $event; getList()"
    />
    <ATable
      v-loading="isLoading"
      :data-list="list"
      hide-select
      show-add
      :entity="MenuEntity"
      :ctrl-width="105"
      :disable-delete="(row: MenuEntity) => row.children.length > 0"
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
import { MenuEditor } from './component'
import { AirRequestPage } from '@/airpower/model/AirRequestPage'
import { MenuEntity } from '@/model/menu/MenuEntity'
import { MenuService } from '@/model/menu/MenuService'
import { AirSort } from '@/airpower/model/AirSort'

const isLoading = ref(false)
const request = ref(new AirRequestPage(MenuEntity).setSort(new AirSort().setField('orderNo')))
const list = ref([] as MenuEntity[])

async function getList() {
  list.value = await MenuService.create(isLoading).getList(request.value)
}

async function onRowAdd(row: MenuEntity) {
  const entity = new MenuEntity()
  entity.parentId = row.id
  entity.parent = row
  await AirDialog.show(MenuEditor, entity)
  getList()
}

async function onEdit(row: MenuEntity) {
  await AirDialog.show(MenuEditor, row)
  getList()
}

async function onDelete(data: MenuEntity) {
  await MenuService.create(isLoading).delete(data.id, '删除权限成功')
  getList()
}

async function onAdd() {
  await AirDialog.show(MenuEditor)
  getList()
}
getList()

</script>
<style scoped lang="scss"></style>
