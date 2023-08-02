<template>
  <ADialog
    :title="(param.id ? '修改' : '添加') + RoleEntity.getClassName()"
    :form-ref="form"
    :loading="isLoading"
    :fullable="false"
    confirm-text="保存"
    @on-confirm="submit()"
    @on-cancel="onCancel()"
  >
    <el-form
      ref="form"
      :model="data"
      label-width="120px"
      :rules="RoleService.createValidator(param)"
      @submit.prevent
    >
      <el-form-item
        :label="RoleEntity.getFormFieldLabel('name')"
        prop="name"
      >
        <AInput
          v-model.name="data.name"
          :entity="RoleEntity"
        />
      </el-form-item>
      <el-form-item
        :label="RoleEntity.getFormFieldLabel('remark')"
        prop="remark"
      >
        <AInput
          v-model.remark="data.remark"
          :entity="RoleEntity"
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
import { RoleService } from '@/model/role/RoleService'
import { RoleEntity } from '@/model/role/RoleEntity'

const props = defineProps(airPropsParam(new RoleEntity()))
const isLoading = ref(false)

const data = ref(props.param.copy())

async function getDetail() {
  if (props.param.id) {
    data.value = await RoleService.create(isLoading).getDetail(props.param.id)
  }
}
getDetail()

const form = ref<AirFormInstance>()
// 表单提交
async function submit() {
  await RoleService.create(isLoading).save(data.value, data.value.id ? '修改权限成功' : '添加权限成功')
  props.onConfirm()
}
</script>

<style scoped lang="scss"></style>
