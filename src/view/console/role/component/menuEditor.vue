<template>
  <ADialog
    :title="RoleEntity.getClassName() + '菜单授权'"
    :form-ref="form"
    :loading="isLoading"
    :fullable="false"
    height="80%"
    confirm-text="保存"
    @on-confirm="submit()"
    @on-cancel="onCancel()"
  >
    <el-tree
      ref="treeRef"
      check-strictly
      default-expand-all
      :data="treeList"
      show-checkbox
      node-key="id"
      :props="AirConfig.defaultTreeProps"
      @check="onSelect"
    />
  </ADialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { ADialog } from '@/airpower/component'
import { AirFormInstance, AirTreeInstance } from '@/airpower/type/AirType'
import { airPropsParam } from '@/airpower/config/AirProps'
import { RoleService } from '@/model/role/RoleService'
import { RoleEntity } from '@/model/role/RoleEntity'
import { AirConfig } from '@/airpower/config/AirConfig'
import { MenuEntity } from '@/model/menu/MenuEntity'
import { MenuService } from '@/model/menu/MenuService'
import { AirRequest } from '@/airpower/model/AirRequest'
import { AirSort } from '@/airpower/model/AirSort'
import { IJson } from '@/airpower/interface/IJson'

const treeRef = ref<AirTreeInstance>()
const props = defineProps(airPropsParam(new RoleEntity()))
const isLoading = ref(false)

const data = ref(props.param.copy())

async function getDetail() {
  data.value = await RoleService.create(isLoading).getDetail(props.param.id)
  treeRef.value?.setCheckedKeys(data.value.menuList.map((item) => item.id))
}
getDetail()

async function onSelect(current: MenuEntity, more: IJson) {
  data.value.menuList = more.checkedNodes
}

const treeList = ref([] as MenuEntity[])

async function getMenuTreeList() {
  treeList.value = await MenuService.create(isLoading).getList(new AirRequest(MenuEntity).setSort(new AirSort().setField('orderNo')))
}

getMenuTreeList()

const form = ref<AirFormInstance>()
// 表单提交
async function submit() {
  await RoleService.create(isLoading).authorizeMenu(data.value.id, data.value.menuList)
  props.onConfirm()
}
</script>

<style scoped lang="scss"></style>
