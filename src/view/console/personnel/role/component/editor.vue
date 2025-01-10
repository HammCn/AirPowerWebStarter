<template>
  <ADialog
    :allow-fullscreen="false"
    :form-ref="formRef"
    :loading="isLoading"
    :title="title"
    confirm-text="保存"
    @on-confirm="onSubmit"
    @on-cancel="onCancel"
  >
    <el-form
      ref="form"
      :model="formData"
      :rules="rules"
      label-width="120px"
      @submit.prevent
    >
      <AFormField field="name" />
    </el-form>
  </ADialog>
</template>

<script lang="ts" setup>
import { ADialog, AFormField } from '@/airpower/component'
import { airPropsParam } from '@/airpower/config/AirProps'
import { RoleService } from '@/model/personnel/role/RoleService'
import { RoleEntity } from '@/model/personnel/role/RoleEntity'
import { useAirEditor } from '@/airpower/hook/useAirEditor'

const props = defineProps(airPropsParam(new RoleEntity()))

const {
  formRef, isLoading, formData, rules, title,
  onSubmit,
} = useAirEditor(props, RoleEntity, RoleService)
</script>

<style lang="scss" scoped></style>
