<template>
  <ADialog
    width="70%"
    height="70%"
    :hide-footer="!mult"
    title="请选择权限"
    is-selector
    :loading="isLoading"
    :disable-confirm="mult && selected.length === 0"
    @on-confirm="onConfirm(selected)"
    @on-cancel="onCancel()"
  >
    <AToolBar
      hide-add
      :loading="isLoading"
      :entity="PermissionEntity"
      @on-search="
        request = $event;
        getList()"
    />
    <ATable
      :data-list="response.list"
      :hide-select="!mult"
      hide-delete
      hide-edit
      :select-list="selected"
      :entity="PermissionEntity"
      :ctrl-width="80"
      hide-field-selector
      :hide-ctrl="mult"
      @on-select=" selected = $event"
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
          @click="
            onConfirm(data)
          "
        />
      </template>
    </ATable>
    <template #footerRight>
      <APage
        :response="response"
        @changed="
          request.page = $event;
          getList()
        "
      />
    </template>
  </ADialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import {
  APage, ATable, AToolBar, ADialog, AButton,
} from '@/airpower/component'
import { airPropsSelector } from '@/airpower/config/AirProps'
import { AirRequestPage } from '@/airpower/model/AirRequestPage'
import { AirResponsePage } from '@/airpower/model/AirResponsePage'
import { PermissionEntity } from '@/model/permission/PermissionEntity'
import { PermissionService } from '@/model/permission/PermissionService'

const props = defineProps(airPropsSelector<PermissionEntity>())

const isLoading = ref(false)

const request = ref(new AirRequestPage(PermissionEntity))
const response = ref(new AirResponsePage<PermissionEntity>())

async function getList() {
  response.value = await PermissionService.create(isLoading).getPage(request.value)
}
getList()

/**
 * 已选择的数据
 */
const selected = ref(props.selectList)

</script>
<style scoped lang="scss"></style>
