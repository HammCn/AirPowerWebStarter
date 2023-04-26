<template>
  <ADialog
    width="70%"
    height="70%"
    :hide-footer="!mult"
    title="请选择用户"
    is-selector
    :loading="isLoading"
    @on-confirm="onConfirm(selected)"
    @on-cancel="onCancel()"
  >
    <AToolBar
      hide-add
      :loading="isLoading"
      :search-entity="MaterialEntity"
      @on-search="
        request = $event;
        getList()"
    />
    <ATable
      :data-list=" response.list "
      :hide-select=" !mult "
      hide-delete
      hide-edit
      :select-list=" selectList "
      :table-entity=" MaterialEntity "
      :ctrl-width=" 80 "
      hide-field-selector
      :hide-ctrl=" mult "
      @select=" selected = $event "
    >
      <template
        v-if=" !mult "
        #customRow=" { data } "
      >
        <el-button
          size="small"
          type="primary"
          :disabled=" data.isDisabled "
          @click="
            onConfirm(data)
          "
        >
          选择
        </el-button>
      </template>
    </ATable>
    <template #footerRight>
      <APage
        :response=" response "
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
  APage, ATable, AToolBar, ADialog,
} from '@/airpower/component'
import { MaterialEntity } from '@/entity/MaterialEntity'
import { airPropsSelector } from '@/airpower/config/AirProps'
import { MaterialService } from '@/service/MaterialService'
import { AirRequestPage } from '@/airpower/dto/AirRequestPage'
import { AirResponsePage } from '@/airpower/dto/AirResponsePage'

defineProps(airPropsSelector<MaterialEntity>())

const isLoading = ref(false)
const service = new MaterialService(isLoading)

const request = ref(new AirRequestPage<MaterialEntity>())
const response = ref(new AirResponsePage<MaterialEntity>())

async function getList() {
  response.value = await service.getPage(request.value)
}
getList()

/**
 * 已选择的数据
 */
const selected = ref([] as MaterialEntity[])

</script>
<style scoped lang="scss"></style>
