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
      :entity="MenuEntity"
      :service="MenuService"
      @on-search="onSearch"
    />
    <ATable
      :data-list="response.list"
      :show-select="mult"
      hide-delete
      hide-edit
      :select-list="selectList"
      :entity="MenuEntity"
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
          type="SELECT"
          icon-button
          :disabled="data.isDisabled"
          tooltip="选择"
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
<style scoped lang="scss"></style>
