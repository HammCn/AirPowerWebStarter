<template>
  <APanel>
    <AToolBar
      :loading="isLoading"
      :entity="SupplierEntity"
      :service="SupplierService"
      @on-add="onAdd()"
      @on-search="request = $event; getList()"
    />
    <ATable
      v-loading="isLoading"
      :data-list="response.list"
      hide-select
      :entity="SupplierEntity"
      :ctrl-width="80"
      @on-edit="onEdit"
      @on-delete="onDelete"
      @on-add="onRowAdd"
      @on-sort-change="request.sort = $event; getList()"
    />
    <template #footerLeft>
      <APage
        :response="response"
        @on-change="
          request.page = $event;
          getList()
        "
      />
    </template>
  </APanel>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import {
  APanel, APage, ATable, AToolBar,
} from '@/airpower/component'
import { AirDialog } from '@/airpower/helper/AirDialog'
import { AirRequestPage } from '@/airpower/model/AirRequestPage'
import { AirResponsePage } from '@/airpower/model/AirResponsePage'
import { SupplierEntity } from '@/model/supplier/SupplierEntity'
import { SupplierService } from '@/model/supplier/SupplierService'
import { SupplierEditor } from './component'

const isLoading = ref(false)
const response = ref(new AirResponsePage<SupplierEntity>())
const request = ref(new AirRequestPage(SupplierEntity))

async function getList() {
  response.value = await SupplierService.create(isLoading).getPage(request.value)
}

function onRowAdd(row: SupplierEntity) {
  // eslint-disable-next-line no-console
  console.log('Row add event', row)
}

async function onEdit(row: SupplierEntity) {
  await AirDialog.show(SupplierEditor, row)
  getList()
}

async function onDelete(data: SupplierEntity) {
  await SupplierService.create(isLoading).delete(data.id, '删除物料成功')
  getList()
}

async function onAdd() {
  await AirDialog.show(SupplierEditor)
  getList()
}

getList()

</script>
<style scoped lang="scss"></style>
