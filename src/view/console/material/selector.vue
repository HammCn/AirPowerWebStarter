<template>
  <ADialog
    width="70%"
    height="70%"
    :hide-footer="!mult"
    title="请选择用户"
    is-selector
    :loading="isLoading"
    :disable-confirm="mult && selected.length === 0"
    @on-confirm="onConfirm(selected)"
    @on-cancel="onCancel()"
  >
    <AToolBar
      hide-add
      :loading="isLoading"
      :entity="MaterialEntity"
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
      :entity="MaterialEntity"
      :ctrl-width="80"
      hide-field-selector
      :hide-ctrl="mult"
      @select=" selected = $event"
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
import { MaterialEntity } from '@/entity/MaterialEntity'
import { airPropsSelector } from '@/airpower/config/AirProps'
import { MaterialService } from '@/service/MaterialService'
import { AirRequestPage } from '@/airpower/dto/AirRequestPage'
import { AirResponsePage } from '@/airpower/dto/AirResponsePage'

const props = defineProps(airPropsSelector<MaterialEntity>())

const isLoading = ref(false)

const request = ref(new AirRequestPage<MaterialEntity>())
const response = ref(new AirResponsePage<MaterialEntity>())

async function getList() {
  response.value = await MaterialService.loading(isLoading).getPage(request.value)
}
getList()

/**
 * 已选择的数据
 */
const selected = ref(props.selectList)

</script>
<style scoped lang="scss"></style>
