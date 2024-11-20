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
      :entity="MenuEntity"
      :loading="isLoading"
      :service="MenuService"
      hide-add
      @on-search="onSearch"
    />
    <ATable
      :ctrl-width="80"
      :data-list="response.list"
      :entity="MenuEntity"
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
          @click=" onConfirm(data)"
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
import { MenuEntity } from '@/model/menu/MenuEntity'
import { MenuService } from '@/model/menu/MenuService'
import { useAirSelector } from '@/airpower/hook/useAirSelector'

const props = defineProps(airPropsSelector<MenuEntity>())

const {
  title, selectList, isLoading, response,
  onSearch, onPageChanged, onSelected,
} = useAirSelector(props, MenuEntity, MenuService)

</script>
<style lang="scss" scoped></style>
