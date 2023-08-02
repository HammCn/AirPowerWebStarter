<template>
  <ADialog
    :title="RoleEntity.getClassName() + '权限授权'"
    :form-ref="form"
    :loading="isLoading"
    :fullable="false"
    height="60%"
    width="80%"
    confirm-text="保存"
    @on-confirm="submit()"
    @on-cancel="onCancel()"
  >
    <ATable
      :select-list="data.permissionList"
      :entity="PermissionEntity"
      :data-list="treeList"
      hide-index
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
import { AirFormInstance, AirTreeInstance } from '@/airpower/type/AirType'
import { airPropsParam } from '@/airpower/config/AirProps'
import { RoleService } from '@/model/role/RoleService'
import { RoleEntity } from '@/model/role/RoleEntity'
import { AirRequest } from '@/airpower/model/AirRequest'
import { PermissionService } from '@/model/permission/PermissionService'
import { PermissionEntity } from '@/model/permission/PermissionEntity'

const treeRef = ref<AirTreeInstance>()
const props = defineProps(airPropsParam(new RoleEntity()))
const isLoading = ref(false)

const data = ref(props.param.copy())

async function getDetail() {
  data.value = await RoleService.create(isLoading).getDetail(props.param.id)
  treeRef.value?.setCheckedKeys(data.value.permissionList.map((item) => item.id))
}
getDetail()

async function onSelect(selectList: PermissionEntity[]) {
  data.value.permissionList = selectList
}

const treeList = ref([] as PermissionEntity[])

async function getPermissionList() {
  treeList.value = await PermissionService.create(isLoading).getList(new AirRequest(PermissionEntity))
}

getPermissionList()

const form = ref<AirFormInstance>()
// 表单提交
async function submit() {
  await RoleService.create(isLoading).authorizePermission(data.value.id, data.value.permissionList)
  props.onConfirm()
}
</script>

<style scoped lang="scss"></style>
