<template>
  <APanel>
    <AToolBar
      :loading="isLoading"
      :entity="RoleEntity"
      :service="RoleService"
      @on-add="onAdd()"
      @on-search="request = $event; getList()"
    />
    <ATable
      v-loading="isLoading"
      :data-list="response.list"
      hide-select
      :entity="RoleEntity"
      :disable-delete="(row: RoleEntity) => row.isSystem"
      :ctrl-width="130"
      @on-edit="onEdit"
      @on-delete="onDelete"
    >
      <template #customRow="row">
        <AButton
          type="CONFIRM"
          tooltip="授权菜单"
          icon-button
          :disabled="row.data.isSystem"
          @click="onMenuEditor(row.data)"
        />
        <AButton
          type="LOCK"
          tooltip="授权权限"
          icon-button
          :disabled="row.data.isSystem"
          @click="onPermissionEditor(row.data)"
        />
      </template>
    </ATable>
    <template #footerRight>
      <APage
        :response="response"
        @on-change="request.page = $event; getList()"
      />
    </template>
  </APanel>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import {
  AButton,
  APage,
  APanel, ATable, AToolBar,
} from '@/airpower/component'
import { AirDialog } from '@/airpower/helper/AirDialog'
import { RoleEditor, RoleMenuEditor, RolePermissionEditor } from './component'
import { AirRequestPage } from '@/airpower/model/AirRequestPage'
import { RoleEntity } from '@/model/role/RoleEntity'
import { RoleService } from '@/model/role/RoleService'
import { AirResponsePage } from '@/airpower/model/AirResponsePage'

const isLoading = ref(false)
const request = ref(new AirRequestPage(RoleEntity))
const response = ref(new AirResponsePage<RoleEntity>())

async function getList() {
  response.value = await RoleService.create(isLoading).getPage(request.value)
}

async function onEdit(row: RoleEntity) {
  await AirDialog.show(RoleEditor, row)
  getList()
}

async function onDelete(data: RoleEntity) {
  await RoleService.create(isLoading).delete(data.id, '删除权限成功')
  getList()
}

async function onAdd() {
  await AirDialog.show(RoleEditor)
  getList()
}

async function onMenuEditor(role: RoleEntity) {
  AirDialog.show(RoleMenuEditor, role)
}

async function onPermissionEditor(role: RoleEntity) {
  AirDialog.show(RolePermissionEditor, role)
}

getList()

</script>
<style scoped lang="scss"></style>
