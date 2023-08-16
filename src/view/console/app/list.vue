<template>
  <APanel>
    <AToolBar
      :loading="isLoading"
      :entity="AppEntity"
      :service="AppService"
      @on-add="onAdd"
      @on-search="onSearch"
    />
    <ATable
      v-loading="isLoading"
      :data-list="response.list"
      :entity="AppEntity"
      @on-edit="onEdit"
      @on-delete="onDelete"
      @on-sort-change="onSortChanged"
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
import { AppEntity } from '@/model/app/AppEntity'
import { AppService } from '@/model/app/AppService'
import { AppEditor } from './component'

const {
  isLoading,
  response,
  onSearch, onAdd, onDelete, onEdit, onPageChanged, onSortChanged,
} = useAirTable(AppEntity, AppService, {
  editView: AppEditor,
})
</script>
<style scoped lang="scss"></style>
