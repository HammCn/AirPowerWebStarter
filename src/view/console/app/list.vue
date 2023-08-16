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
      :ctrl-width="105"
      @on-edit="onEdit"
      @on-delete="onDelete"
      @on-sort-change="onSortChanged"
    >
      <template #customRow="{data}">
        <AButton
          icon-button
          type="MONITOR"
          @click="openOAuth2(data)"
        />
      </template>
    </ATable>
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
  APanel, APage, ATable, AToolBar, AButton,
} from '@/airpower/component'
import { useAirTable } from '@/airpower/hook/useAirTable'
import { AppEntity } from '@/model/app/AppEntity'
import { AppService } from '@/model/app/AppService'
import { AppEditor } from './component'
import { AirConfig } from '@/airpower/config/AirConfig'

const {
  isLoading,
  response,
  onSearch, onAdd, onDelete, onEdit, onPageChanged, onSortChanged,
} = useAirTable(AppEntity, AppService, {
  editView: AppEditor,
})

function openOAuth2(app: AppEntity) {
  // eslint-disable-next-line no-restricted-globals
  window.open(`${AirConfig.oauthUrl}?appKey=${app.appKey}&redirectUri=${encodeURIComponent(`${app.url}/callback`)}`)
}
</script>
<style scoped lang="scss"></style>
