<template>
  <ADialog
    title="用户详情"
    hide-ctrl
    width="500"
    height="300"
    @on-confirm="onConfirm()"
    @on-cancel="onCancel()"
  >
    <div>
      标准对象数据：<br>

      {{ param }}
    </div>
    <hr>
    <div>
      原始接口数据:<br>

      {{ param.toSourceString() }}
    </div>
    <el-button @click="newDialog">
      new dialog
    </el-button>
  </ADialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { ADialog } from '@/airpower/component'
import { airPropsParam } from '@/airpower/config/AirProps'
import { MaterialEntity } from '@/entity/MaterialEntity'
import { MaterialDetail } from '@/component/detail'
import { MaterialService } from '@/service/MaterialService'
import { AirDialogHelper } from '@/airpower/helper/AirDialogHelper'

const props = defineProps(airPropsParam<MaterialEntity>())

const detail = ref(new MaterialEntity())

async function getDetail() {
  detail.value = await new MaterialService().getDetail(props.param.id)
}

getDetail()

function newDialog() {
  AirDialogHelper.show(MaterialDetail, new MaterialEntity().setId(123))
}
</script>

<style scoped lang="scss"></style>
