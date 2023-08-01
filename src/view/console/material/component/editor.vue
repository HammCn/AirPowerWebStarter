<template>
  <ADialog
    :title="(param.id ? '修改' : '新增') + MaterialEntity.getClassName()"
    width="1000px"
    height="600px"
    :form-ref="form"
    :loading="isLoading"
    @on-confirm="submit()"
    @on-cancel="onCancel()"
  >
    {{ data }}
    <el-form
      ref="form"
      :model="data"
      label-width="120px"
      :rules="MaterialService.createValidator(param, rules)"
      @submit.prevent
    >
      <AGroup
        title="传统方式"
        disable-collapse
        :column="1"
      >
        <el-form-item
          :label="MaterialEntity.getFormFieldLabel('materialName')"
          prop="materialName"
        >
          <AInput
            v-model.materialName="data.materialName"
            :entity="MaterialEntity"
          />
        </el-form-item>
        <el-form-item
          :label="MaterialEntity.getFormFieldLabel('materialSpc')"
          prop="materialSpc"
        >
          <AInput
            v-model.materialSpc="data.materialSpc"
            :entity="MaterialEntity"
          />
        </el-form-item>
        <el-form-item
          :label="MaterialEntity.getFormFieldLabel('materialType')"
          prop="materialType"
        >
          <AInput
            v-model.materialType="data.materialType"
            :entity="MaterialEntity"
          />
        </el-form-item>
        <el-form-item
          :label="MaterialEntity.getFormFieldLabel('remark')"
          prop="remark"
        >
          <AInput
            v-model.remark="data.remark"
            :entity="MaterialEntity"
          />
        </el-form-item>
      </AGroup>
      <AGroup
        title="循环方式"
        disable-collapse
        :column="2"
      >
        <template
          v-for="item in MaterialEntity.getFormFieldConfigList()"
          :key="item.id"
        >
          <el-form-item
            :label="MaterialEntity.getFormFieldLabel(item.key)"
            :prop="item.key"
          >
            <AInput
              v-model="(data as any)[item.key]"
              :modifier="item.key"
              :entity="MaterialEntity"
            />
          </el-form-item>
        </template>
      </AGroup>
    </el-form>
  </ADialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { ADialog, AGroup, AInput } from '@/airpower/component'
import { AirValidator } from '@/airpower/helper/AirValidator'
import { AirFormInstance } from '@/airpower/type/AirType'
import { airPropsParam } from '@/airpower/config/AirProps'
import { AirInputType } from '@/airpower/enum/AirInputType'
import { MaterialEntity } from '@/model/material/MaterialEntity'
import { MaterialService } from '@/model/material/MaterialService'

const props = defineProps(airPropsParam(new MaterialEntity()))
const isLoading = ref(false)

const data = ref(props.param.copy())

async function getDetail() {
  if (props.param.id) {
    data.value = await MaterialService.create(isLoading).getDetail(props.param.id)
  }
}
getDetail()

const rules = AirValidator.create({
  name: [
    AirValidator.show('只允许输入字母和数字和.').ifNot(
      AirInputType.NUMBER,
      AirInputType.LETTER,
      '.',
    ),
  ],
})

const form = ref<AirFormInstance>()
// 表单提交
async function submit() {
  await MaterialService.create(isLoading).save(data.value, data.value.id ? '修改物料成功' : '新增物料成功')
  props.onConfirm()
}
</script>

<style scoped lang="scss"></style>
