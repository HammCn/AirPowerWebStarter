<template>
  <ADialog
    :allow-fullscreen="false"
    :form-ref="formRef"
    :loading="isLoading"
    :title="(RoleEntity.getModelConfig().label || '') + '权限授权'"
    confirm-text="保存"
    height="70%"
    width="70%"
    @on-confirm="onSubmit"
    @on-cancel="onCancel"
  >
    <ATable
      :data-list="treeList"
      :default-expand-all="false"
      :entity="PermissionEntity"
      :select-list="formData.permissionList"
      hide-ctrl
      hide-field-selector
      hide-index
      show-select
      @on-select="onSelect"
    />
  </ADialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { ADialog, ATable } from '@/airpower/component'
import { airPropsParam } from '@/airpower/config/AirProps'
import { RoleService } from '@/model/role/RoleService'
import { RoleEntity } from '@/model/role/RoleEntity'
import { AirRequest } from '@/airpower/model/AirRequest'
import { PermissionService } from '@/model/permission/PermissionService'
import { PermissionEntity } from '@/model/permission/PermissionEntity'
import { useAirEditor } from '@/airpower/hook/useAirEditor'
import { AirNotification } from '@/airpower/feedback/AirNotification'

const props = defineProps(airPropsParam(new RoleEntity()))

const {
  isLoading, formRef, formData,
} = useAirEditor(props, RoleEntity, RoleService, {})

async function onSelect(selectList: PermissionEntity[]) {
  formData.value.permissionList = selectList
}

const treeList = ref<PermissionEntity[]>([])

async function getPermissionList() {
  treeList.value = await PermissionService.create(isLoading).getList(new AirRequest(PermissionEntity))
}

async function onSubmit() {
  await RoleService.create(isLoading).authorizePermission(formData.value.id, formData.value.permissionList)
  AirNotification.success('授权权限成功')
  props.onConfirm()
}

getPermissionList()

</script>

<style lang="scss" scoped></style>
