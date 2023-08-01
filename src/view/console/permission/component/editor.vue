<template>
  <ADialog
    :title="(param.id ? '修改' : '新增') + PermissionEntity.getClassName()"
    :form-ref="form"
    :loading="isLoading"
    @on-confirm="submit()"
    @on-cancel="onCancel()"
  >
    <el-form
      ref="form"
      :model="data"
      label-width="120px"
      :rules="PermissionService.createValidator(param)"
      @submit.prevent
    >
      <el-form-item
        v-if="param.parent"
        label="父权限"
      >
        {{ param.parent.name }}
      </el-form-item>
      <el-form-item
        :label="PermissionEntity.getFormFieldLabel('name')"
        prop="name"
      >
        <AInput
          v-model.name="data.name"
          :entity="PermissionEntity"
        />
      </el-form-item>
      <el-form-item
        :label="PermissionEntity.getFormFieldLabel('identity')"
        prop="identity"
      >
        <AInput
          v-model.identity="data.identity"
          :entity="PermissionEntity"
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
import { PermissionService } from '@/model/permission/PermissionService'
import { PermissionEntity } from '@/model/permission/PermissionEntity'

const props = defineProps(airPropsParam(new PermissionEntity()))
const isLoading = ref(false)

const data = ref(props.param.copy())

async function getDetail() {
  if (props.param.id) {
    data.value = await PermissionService.create(isLoading).getDetail(props.param.id)
  }
}
getDetail()

const form = ref<AirFormInstance>()
// 表单提交
async function submit() {
  await PermissionService.create(isLoading).save(data.value, data.value.id ? '修改权限成功' : '新增权限成功')
  props.onConfirm()
}
</script>

<style scoped lang="scss"></style>
