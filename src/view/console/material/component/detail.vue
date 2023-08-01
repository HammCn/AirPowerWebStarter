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

      {{ detail.toJson() }}
    </div>
  </ADialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { ADialog } from '@/airpower/component'
import { airPropsParam } from '@/airpower/config/AirProps'
import { MaterialEntity } from '@/model/material/MaterialEntity'
import { MaterialService } from '@/model/material/MaterialService'

const props = defineProps(airPropsParam(new MaterialEntity()))
const isLoading = ref(false)
const detail = ref(props.param.copy())

async function getDetail() {
  detail.value = await MaterialService.create(isLoading).getDetail(props.param.id)
}

getDetail()
</script>

<style scoped lang="scss"></style>
