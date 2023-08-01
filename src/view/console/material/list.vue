<template>
  <APanel>
    <AToolBar
      :loading="isLoading"
      :entity="MaterialEntity"
      :service="MaterialService"
      show-import
      @on-add="onAdd()"
      @on-search="request = $event; getList()"
    >
      <template #materialName="{ data }">
        <el-input
          v-model="data.materialName"
          placeholder="自定义搜索插槽"
        />
      </template>
    </AToolBar>
    <ATable
      v-loading="isLoading"
      :data-list="response.list"
      hide-select
      show-detail
      show-add
      :entity="MaterialEntity"
      :ctrl-width="130"
      :disable-delete="(row: MaterialEntity) => {
        return row.id / 3 === 0
      }
      "
      @on-detail="onDetail"
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
import { MaterialDetail, MaterialEditor } from './component'
import { AirRequestPage } from '@/airpower/model/AirRequestPage'
import { AirResponsePage } from '@/airpower/model/AirResponsePage'
import { MaterialEntity } from '@/model/material/MaterialEntity'
import { MaterialService } from '@/model/material/MaterialService'

const isLoading = ref(false)
const response = ref(new AirResponsePage<MaterialEntity>())
const request = ref(new AirRequestPage(MaterialEntity))

async function getList() {
  response.value = await MaterialService.create(isLoading).getPage(request.value)
}

function onRowAdd(row: MaterialEntity) {
  // eslint-disable-next-line no-console
  console.log('Row add event', row)
}

async function onEdit(row: MaterialEntity) {
  await AirDialog.show(MaterialEditor, row)
  getList()
}

async function onDelete(data: MaterialEntity) {
  await MaterialService.create(isLoading).delete(data.id, '删除物料成功')
  getList()
}

async function onAdd() {
  await AirDialog.show(MaterialEditor)
  getList()
}

async function onDetail(data: MaterialEntity) {
  await AirDialog.show(MaterialDetail, data)
  getList()
}

getList()

</script>
<style scoped lang="scss"></style>
