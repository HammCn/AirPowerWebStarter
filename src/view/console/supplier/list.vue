<template>
  <APanel>
    <AToolBar
      :loading="isLoading"
      :entity="SupplierEntity"
      :service="SupplierService"
      @on-add="onAdd"
      @on-search="onSearch"
    >
      <template #afterButton>
        <AButton
          v-if="selectList.length > 0"
          type="DELETE_LIST"
          danger
          @click="AirNotification.warning('就是玩'); selectList = []"
        >
          批量删除
        </AButton>
      </template>
    </AToolBar>
    <ATable
      v-loading="isLoading"
      :data-list="response.list"
      :entity="SupplierEntity"
      :select-list="selectList"
      show-select
      :ctrl-width="90"
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
  AButton, APage, APanel, ATable, AToolBar,
} from '@/airpower/component'
import { useAirTable } from '@/airpower/hook/useAirTable'
import { SupplierEntity } from '@/model/supplier/SupplierEntity'
import { SupplierService } from '@/model/supplier/SupplierService'
import { SupplierEditor } from './component'
import { AirNotification } from '@/airpower/feedback/AirNotification'

const {
  isLoading,
  response,
  selectList,
  onSearch, onAdd, onDelete, onEdit, onPageChanged, onSortChanged, onSelected,
} = useAirTable(SupplierEntity, SupplierService, {
  editView: SupplierEditor,
  beforeSearch(requestData) {
    requestData.keyword = '强制搜索关键词'
    return requestData
  },
})
</script>
<style scoped lang="scss"></style>
