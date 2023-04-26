<template>
  <ADialog
    :title="(param ? '修改' : '新增') + MaterialEntity.prototype.getCustomClassName()"
    confirm-text="保存"
    width="1000px"
    height="600px"
    :form-ref="form"
    :loading="isLoading"
    @on-confirm="submit()"
    @on-cancel="onCancel()"
  >
    <el-form
      ref="form"
      :model="data"
      label-width="120px"
      :rules="rules"
      @submit.prevent
    >
      <AGroup
        title="传统方式"
        disable-collapse
        :column="1"
      >
        <el-form-item
          :label="MaterialEntity.prototype.getFormFieldLabel('name')"
          prop="name"
        >
          <AInput
            v-model.name="data.name"
            :entity="MaterialEntity"
          />
        </el-form-item>
        <el-form-item
          :label="MaterialEntity.prototype.getFormFieldLabel('spc')"
          prop="spc"
        >
          <AInput
            v-model.spc="data.spc"
            :entity="MaterialEntity"
          />
        </el-form-item>
        <el-form-item
          :label="MaterialEntity.prototype.getFormFieldLabel('materialType')"
          prop="materialType"
        >
          <AInput
            v-model.materialType="data.materialType"
            :entity="MaterialEntity"
          />
        </el-form-item>
        <el-form-item
          :label="MaterialEntity.prototype.getFormFieldLabel('remark')"
          prop="remark"
        >
          <AInput
            v-model.remark="data.remark"
            :entity="MaterialEntity"
          />
        </el-form-item>
      </AGroup>
      <AGroup
        v-if="false"
        title="循环方式"
        disable-collapse
        :column="2"
      >
        <template
          v-for="item in MaterialEntity.prototype.getFormFieldConfigList()"
          :key="item.id"
        >
          <el-form-item
            :label="MaterialEntity.prototype.getFormFieldLabel(item.key)"
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
import { AirValidator } from '@/airpower/model/AirValidator'
import { MaterialEntity } from '@/entity/MaterialEntity'
import { AirValidatorHelper } from '@/airpower/helper/AirValidatorHelper'
import { AirFormInstance } from '@/airpower/type/AirType'
import { airPropsParam } from '@/airpower/config/AirProps'
import { MaterialService } from '@/service/MaterialService'
import { AirInputType } from '@/airpower/enum/AirInputType'

const props = defineProps(airPropsParam<MaterialEntity>())
const isLoading = ref(false)
const service = new MaterialService(isLoading)

const data = ref(new MaterialEntity())
async function getDetail() {
  if (props.param) {
    data.value = await service.getDetail(props.param.id)
  }
}
getDetail()

const rules = AirValidatorHelper.create({
  spc: [
    new AirValidator().ifEmpty(),
  ],
  name: [
    new AirValidator().ifEmpty(),
    new AirValidator().ifNot(AirInputType.NUMBER, AirInputType.LETTER, '.'),
  ],
  materialType: [
    new AirValidator().show('请选择物料类型')
      .toNumber()
      .ifEmpty(),
  ],
})

const form = ref<AirFormInstance>()
// 表单提交
async function submit() {
  await service.save(data.value, data.value.id ? '修改物料成功' : '新增物料成功')
  props.onConfirm()
}
</script>

<style scoped lang="scss"></style>
