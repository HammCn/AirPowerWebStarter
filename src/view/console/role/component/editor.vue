<template>
  <ADialog
    :title="title"
    :form-ref="formRef"
    :loading="isLoading"
    :fullable="false"
    confirm-text="保存"
    @on-confirm="onSubmit()"
    @on-cancel="onCancel()"
  >
    <el-form
      ref="form"
      :model="formData"
      label-width="120px"
      :rules="rules"
      @submit.prevent
    >
      <AFormField field="name" />
    </el-form>
  </ADialog>
</template>

<script lang="ts" setup>
import { ADialog, AFormField } from '@/airpower/component'
import { airPropsParam } from '@/airpower/config/AirProps'
import { RoleService } from '@/model/role/RoleService'
import { RoleEntity } from '@/model/role/RoleEntity'
import { useAirEditor } from '@/airpower/hook/useAirEditor'

const props = defineProps(airPropsParam(new RoleEntity()))

const {
  formRef, isLoading, formData, rules, title,
  onSubmit,
} = useAirEditor(props, RoleEntity, RoleService)
</script>

<style scoped lang="scss"></style>
