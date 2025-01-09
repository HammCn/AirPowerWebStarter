<template>
  <ADialog
    :disable-confirm="isMultiple && selectList.length === 0"
    :hide-footer="!isMultiple"
    :loading="isLoading"
    :title="title"
    height="70%"
    is-selector
    width="70%"
    @on-confirm="onConfirm(selectList)"
    @on-cancel="onCancel"
  >
    <AToolBar
      :entity="PermissionEntity"
      :loading="isLoading"
      :service="PermissionService"
      hide-add
      @on-search="onSearch"
    />
    <ATable
      :ctrl-width="80"
      :data-list="response.list"
      :entity="PermissionEntity"
      :hide-ctrl="isMultiple"
      :select-list="selectList"
      :show-select="isMultiple"
      hide-delete
      hide-edit
      hide-field-selector
      @on-select="onSelected"
    >
      <template
        v-if="!isMultiple"
        #customRow="{ data }"
      >
        <AButton
          :disabled="data.isDisabled"
          icon-button
          tooltip="选择"
          type="SELECT"
          @click="
            onConfirm(data)
          "
        />
      </template>
    </ATable>
    <template #status>
      <APage
        :response="response"
        @changed="onPageChanged"
      />
    </template>
  </ADialog>
</template>

<script lang="ts" setup>
import {
  AButton, ADialog, APage, ATable, AToolBar,
} from '@/airpower/component'
import { airPropsSelector } from '@/airpower/config/AirProps'
import { PermissionEntity } from '@/model/system/permission/PermissionEntity'
import { useAirSelector } from '@/airpower/hook/useAirSelector'
import { PermissionService } from '@/model/system/permission/PermissionService'

const props = defineProps(airPropsSelector<PermissionEntity>())

const {
  title, selectList, isLoading, response,
  onSearch, onPageChanged, onSelected,
} = useAirSelector(props, PermissionEntity, PermissionService)

</script>
<style lang="scss" scoped></style>
