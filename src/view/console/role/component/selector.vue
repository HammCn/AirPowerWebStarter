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
      :entity="RoleEntity"
      :loading="isLoading"
      :service="RoleService"
      hide-add
      @on-search="onSearch"
    />
    <ATable
      :ctrl-width="80"
      :data-list="response.list"
      :entity="RoleEntity"
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
          link-button
          tooltip="选择"
          @click="
            onConfirm(data)
          "
        >
          选择
        </AButton>
      </template>
    </ATable>
    <template #footerRight>
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
import { RoleEntity } from '@/model/role/RoleEntity'
import { RoleService } from '@/model/role/RoleService'
import { useAirSelector } from '@/airpower/hook/useAirSelector'

const props = defineProps(airPropsSelector<RoleEntity>())

const {
  title, selectList, onSelected, isLoading, response,
  onSearch, onPageChanged,
} = useAirSelector(props, RoleEntity, RoleService)
</script>
<style lang="scss" scoped></style>
