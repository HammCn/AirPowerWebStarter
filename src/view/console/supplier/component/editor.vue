<template>
  <ADialog
    :title="title"
    :form-ref="formRef"
    :loading="isLoading"
    @on-confirm="onSubmit()"
    @on-cancel="onCancel()"
  >
    <el-form
      ref="formRef"
      :model="formData"
      label-width="120px"
      :rules="rules"
      @submit.prevent
    >
      <el-form-item
        :label="SupplierEntity.getFormFieldLabel('code')"
        prop="code"
      >
        <AInput
          v-model.code="formData.code"
          :entity="SupplierEntity"
        />
      </el-form-item>
      <el-form-item
        :label="SupplierEntity.getFormFieldLabel('name')"
        prop="name"
      >
        <AInput
          v-model.name="formData.name"
          :entity="SupplierEntity"
        />
      </el-form-item>
      <el-form-item
        :label="SupplierEntity.getFormFieldLabel('level')"
        prop="level"
      >
        <AInput
          v-model.level="formData.level"
          :entity="SupplierEntity"
        />
      </el-form-item>
      <el-form-item
        :label="SupplierEntity.getFormFieldLabel('phone')"
        prop="phone"
      >
        <AInput
          v-model.phone="formData.phone"
          :entity="SupplierEntity"
        />
      </el-form-item>
    </el-form>
  </ADialog>
</template>

<script lang="ts" setup>
import { ADialog, AInput } from '@/airpower/component'
import { airPropsParam } from '@/airpower/config/AirProps'
import { useAirEditor } from '@/airpower/hook/useAirEditor'
import { SupplierEntity } from '@/model/supplier/SupplierEntity'
import { SupplierService } from '@/model/supplier/SupplierService'

const props = defineProps(airPropsParam(new SupplierEntity()))

const {
  title, formData, rules, formRef, isLoading,
  onSubmit,
} = useAirEditor(props, SupplierEntity, SupplierService)

</script>
