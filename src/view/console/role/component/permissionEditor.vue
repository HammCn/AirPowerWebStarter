<template>
  <ADialog
    :title="RoleEntity.getModelName() + '权限授权'"
    :form-ref="formRef"
    :loading="isLoading"
    :fullable="false"
    height="70%"
    width="70%"
    confirm-text="保存"
    @on-confirm="onSubmit()"
    @on-cancel="onCancel()"
  >
    <ATable
      :select-list="formData.permissionList"
      :entity="PermissionEntity"
      :data-list="treeList"
      hide-index
      show-select
      :default-expand-all="false"
      hide-ctrl
      hide-field-selector
      @on-select="onSelect"
    />
  </ADialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { ADialog, ATable } from '@/airpower/component'
import { AirTreeInstance } from '@/airpower/type/AirType'
import { airPropsParam } from '@/airpower/config/AirProps'
import { RoleService } from '@/model/role/RoleService'
import { RoleEntity } from '@/model/role/RoleEntity'
import { AirRequest } from '@/airpower/model/AirRequest'
import { PermissionService } from '@/model/permission/PermissionService'
import { PermissionEntity } from '@/model/permission/PermissionEntity'
import { useAirEditor } from '@/airpower/hook/useAirEditor'
import { AirNotification } from '@/airpower/feedback/AirNotification'

const treeRef = ref<AirTreeInstance>()

const props = defineProps(airPropsParam(new RoleEntity()))

const {
  isLoading, formRef, formData,
} = useAirEditor(props, RoleEntity, RoleService, {
  afterGetDetail() {
    treeRef.value?.setCheckedKeys(formData.value.permissionList.map((item) => item.id))
  },
})

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

<style scoped lang="scss"></style>
