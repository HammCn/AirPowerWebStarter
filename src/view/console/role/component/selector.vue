<template>
  <ADialog
    width="70%"
    height="70%"
    :hide-footer="!mult"
    :title="title"
    is-selector
    :loading="isLoading"
    :disable-confirm="mult && selectList.length === 0"
    @on-confirm="onConfirm(selectList)"
    @on-cancel="onCancel"
  >
    <AToolBar
      hide-add
      :loading="isLoading"
      :entity="RoleEntity"
      :service="RoleService"
      @on-search="onSearch"
    />
    <ATable
      :data-list="response.list"
      :show-select="mult"
      hide-delete
      hide-edit
      :select-list="selectList"
      :entity="RoleEntity"
      :ctrl-width="80"
      hide-field-selector
      :hide-ctrl="mult"
      @on-select="onSelected"
    >
      <template
        v-if="!mult"
        #customRow="{ data }"
      >
        <AButton
          link-button
          :disabled="data.isDisabled"
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
  APage, ATable, AToolBar, ADialog, AButton,
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
<style scoped lang="scss"></style>
