<template>
  <ADialog
    :title="(param.id ? '修改' : '添加') + MenuEntity.getClassName()"
    :form-ref="form"
    :fullable="false"
    :loading="isLoading"
    confirm-text="保存"
    @on-confirm="submit()"
    @on-cancel="onCancel()"
  >
    <el-form
      ref="form"
      :model="data"
      label-width="120px"
      :rules="MenuService.createValidator(param)"
      @submit.prevent
    >
      <el-form-item
        v-if="param.parent"
        label="父菜单"
      >
        {{ param.parent.name }}
      </el-form-item>
      <el-form-item
        :label="MenuEntity.getFormFieldLabel('name')"
        prop="name"
      >
        <AInput
          v-model.name="data.name"
          :entity="MenuEntity"
        />
      </el-form-item>
      <el-form-item
        :label="MenuEntity.getFormFieldLabel('path')"
        prop="path"
      >
        <AInput
          v-model.path="data.path"
          :entity="MenuEntity"
        />
      </el-form-item>
      <el-form-item
        :label="MenuEntity.getFormFieldLabel('component')"
        prop="component"
      >
        <AInput
          v-model.path="data.component"
          :entity="MenuEntity"
        />
      </el-form-item>
      <el-form-item
        :label="MenuEntity.getFormFieldLabel('orderNo')"
        prop="orderNo"
      >
        <AInput
          v-model.orderNo="data.orderNo"
          :entity="MenuEntity"
        />
      </el-form-item>
      <el-form-item
        :label="MenuEntity.getFormFieldLabel('icon')"
        prop="icon"
      >
        <AInput
          v-model.icon="data.icon"
          :entity="MenuEntity"
        />
      </el-form-item>
    </el-form>
  </ADialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { ADialog, AInput } from '@/airpower/component'
import { AirFormInstance } from '@/airpower/type/AirType'
import { airPropsParam } from '@/airpower/config/AirProps'
import { MenuService } from '@/model/menu/MenuService'
import { MenuEntity } from '@/model/menu/MenuEntity'

const props = defineProps(airPropsParam(new MenuEntity()))
const isLoading = ref(false)

const data = ref(props.param.copy())

async function getDetail() {
  if (props.param.id) {
    data.value = await MenuService.create(isLoading).getDetail(props.param.id)
  }
}
getDetail()

const form = ref<AirFormInstance>()
// 表单提交
async function submit() {
  await MenuService.create(isLoading).save(data.value, data.value.id ? '修改权限成功' : '添加权限成功')
  props.onConfirm()
}
</script>

<style scoped lang="scss"></style>
