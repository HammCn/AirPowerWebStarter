<template>
  <ADialog
    title="用户详情"
    hide-ctrl
    width="500"
    height="300"
    :loading="isLoading"
    @on-confirm="onConfirm()"
    @on-cancel="onCancel()"
  >
    <div>
      标准对象数据：<br>

      {{ detail }}
    </div>
    <hr>
    <div>
      原始接口数据:<br>

      {{ detail.toJsonString() }}
    </div>
  </ADialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { ADialog } from '@/airpower/component'
import { airPropsParam } from '@/airpower/config/AirProps'
import { MaterialEntity } from '@/model/entity/MaterialEntity'
import { MaterialService } from '@/service/MaterialService'

const props = defineProps(airPropsParam<MaterialEntity>(new MaterialEntity()))
const isLoading = ref(false)
const detail = ref(props.param.copy())

async function getDetail() {
  detail.value = await MaterialService.loading(isLoading).getDetail(props.param.id)
}

getDetail()
</script>

<style scoped lang="scss"></style>
