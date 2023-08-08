<template>
  <APanel>
    <AToolBar
      :loading="isLoading"
      :entity="SupplierEntity"
      :service="SupplierService"
      @on-add="onAdd"
      @on-search="onSearch"
    />
    <ATable
      v-loading="isLoading"
      :data-list="response.list"
      :entity="SupplierEntity"
      :select-list="selectList"
      show-select
      @on-edit="onEdit"
      @on-delete="onDelete"
      @on-sort-change="onSortChanged"
      @on-select="onSelected"
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
  APanel, APage, ATable, AToolBar,
} from '@/airpower/component'
import { useAirTable } from '@/airpower/hook/useAirTable'
import { SupplierEntity } from '@/model/supplier/SupplierEntity'
import { SupplierService } from '@/model/supplier/SupplierService'
import { SupplierEditor } from './component'
import { AirRequest } from '@/airpower/model/AirRequest'

const {
  isLoading,
  response,
  selectList,
  onSearch, onAdd, onDelete, onEdit, onPageChanged, onSortChanged, onSelected,
} = useAirTable(SupplierEntity, SupplierService, {
  editor: SupplierEditor,
  beforeSearch: (request: AirRequest<SupplierEntity>) => {
    request.keyword = '强制搜索的关键词'
    return request
  },
})
</script>
<style scoped lang="scss"></style>
