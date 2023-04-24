<template>
  <APanel>
    <AToolBar
      :loading="isLoading"
      :entity="MaterialEntity"
      :service="MaterialService"
      show-import
      @on-add="onAdd()"
      @on-search="request = $event; getList()"
    />
    <ATable
      v-loading="isLoading"
      :data-list=" response.list "
      hide-select
      show-detail
      show-add
      :entity=" MaterialEntity "
      :ctrl-width=" 130 "
      :disable-delete="
        (row: MaterialEntity) => {
          return row.id / 3 === 0
        }
      "
      @on-detail=" onDetail "
      @on-edit=" onEdit "
      @on-delete=" onDelete "
      @on-add=" onRowAdd "
      @on-sort-change=" request.sort = $event; getList() "
    />
    <template #footerLeft>
      <APage
        :response=" response "
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
import { MaterialEntity } from '@/entity/MaterialEntity'
import EditView from './edit.vue'
import { MaterialService } from '@/service/MaterialService'
import { AirDialogHelper } from '@/airpower/helper/AirDialogHelper'
import { MaterialDetail } from '@/component/detail'
import { AirResponsePage } from '@/airpower/dto/AirResponsePage'
import { AirRequestPage } from '@/airpower/dto/AirRequestPage'

const response = ref(new AirResponsePage<MaterialEntity>())
const request = ref(new AirRequestPage<MaterialEntity>())
const isLoading = ref(false)

async function getList() {
  response.value = await new MaterialService(isLoading).getPage(request.value)
}

function onRowAdd(row: MaterialEntity) {
  // eslint-disable-next-line no-console
  console.log('Row add event', row)
}

async function onEdit(row: MaterialEntity) {
  await AirDialogHelper.show(EditView, row)
  getList()
}

async function onDelete(data: MaterialEntity) {
  await new MaterialService(isLoading).delete(data.id, '删除物料成功')
  getList()
}

async function onAdd() {
  await AirDialogHelper.show(EditView)
  getList()
}

async function onDetail(data: MaterialEntity) {
  await AirDialogHelper.show(MaterialDetail, data)
  getList()
}

getList()
</script>
<style scoped lang="scss"></style>
