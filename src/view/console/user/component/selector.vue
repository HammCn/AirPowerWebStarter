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
    @on-cancel="onCancel()"
  >
    <AToolBar
      hide-add
      :loading="isLoading"
      :entity="UserEntity"
      :service="UserService"
      @on-search="onSearch"
    />
    <ATable
      :data-list="response.list"
      :show-select="mult"
      hide-delete
      hide-edit
      :select-list="selectList"
      :entity="UserEntity"
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
import { UserEntity } from '@/model/user/UserEntity'
import { UserService } from '@/model/user/UserService'
import { useAirSelector } from '@/airpower/hook/useAirSelector'

const props = defineProps(airPropsSelector<UserEntity>())

const {
  title, selectList, isLoading, response,
  onSearch, onPageChanged, onSelected,
} = useAirSelector(props, UserEntity, UserService)

</script>
<style scoped lang="scss"></style>
