<template>
  <ADialog
    :title="(param.id ? '修改' : '添加') + SupplierEntity.getClassName()"
    :form-ref="form"
    :loading="isLoading"
    @on-confirm="submit()"
    @on-cancel="onCancel()"
  >
    <el-form
      ref="form"
      :model="data"
      label-width="120px"
      :rules="SupplierService.createValidator(param, rules)"
      @submit.prevent
    >
      <el-form-item
        :label="SupplierEntity.getFormFieldLabel('code')"
        prop="code"
      >
        <AInput
          v-model.code="data.code"
          :entity="SupplierEntity"
        />
      </el-form-item>
      <el-form-item
        :label="SupplierEntity.getFormFieldLabel('name')"
        prop="name"
      >
        <AInput
          v-model.name="data.name"
          :entity="SupplierEntity"
        />
      </el-form-item>
      <el-form-item
        :label="SupplierEntity.getFormFieldLabel('level')"
        prop="level"
      >
        <AInput
          v-model.level="data.level"
          :entity="SupplierEntity"
        />
      </el-form-item>
      <el-form-item
        :label="SupplierEntity.getFormFieldLabel('phone')"
        prop="phone"
      >
        <AInput
          v-model.phone="data.phone"
          :entity="SupplierEntity"
        />
      </el-form-item>
    </el-form>
  </ADialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { ADialog, AInput } from '@/airpower/component'
import { AirValidator } from '@/airpower/helper/AirValidator'
import { AirFormInstance } from '@/airpower/type/AirType'
import { airPropsParam } from '@/airpower/config/AirProps'
import { AirInputType } from '@/airpower/enum/AirInputType'
import { SupplierEntity } from '@/model/supplier/SupplierEntity'
import { SupplierService } from '@/model/supplier/SupplierService'

const props = defineProps(airPropsParam(new SupplierEntity()))
const isLoading = ref(false)

const data = ref(props.param.copy())

async function getDetail() {
  if (props.param.id) {
    data.value = await SupplierService.create(isLoading).getDetail(props.param.id)
  }
}
getDetail()

const rules = AirValidator.create({
  name: [
    AirValidator.show('只允许汉字和字母.').ifNot(
      AirInputType.CHINESE,
      AirInputType.LETTER,
      '.',
    ),
  ],
})

const form = ref<AirFormInstance>()
// 表单提交
async function submit() {
  await SupplierService.create(isLoading).save(data.value, data.value.id ? '修改供应商成功' : '添加供应商成功')
  props.onConfirm()
}
</script>

<style scoped lang="scss"></style>
