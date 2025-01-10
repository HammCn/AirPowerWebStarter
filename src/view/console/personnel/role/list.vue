<template>
  <APanel>
    <AToolBar
      :entity="RoleEntity"
      :loading="isLoading"
      :service="RoleService"
      @on-add="onAdd"
      @on-search="onSearch"
    />
    <ATable
      v-loading="isLoading"
      :ctrl-width="190"
      :data-list="response.list"
      :entity="RoleEntity"
      show-enable-and-disable
      @on-edit="onEdit"
      @on-delete="onDelete"
      @on-disable="onDisable"
      @on-enable="onEnable"
    >
      <template #customRow="{ data }">
        <AButton
          link-button
          tooltip="授权菜单"
          @click="onMenuEditor(data)"
        >
          菜单
        </AButton>
        <AButton
          link-button
          tooltip="授权权限"
          @click="onPermissionEditor(data)"
        >
          权限
        </AButton>
      </template>
    </ATable>
    <template #footerLeft>
      <APage
        :response="response"
        @on-change="onPageChanged"
      />
    </template>
  </APanel>
</template>

<script lang="ts" setup>
import {
  AButton, APage, APanel, ATable, AToolBar,
} from '@/airpower/component'
import { AirDialog } from '@/airpower/helper/AirDialog'
import { RoleEditor, RoleMenuEditor, RolePermissionEditor } from './component'
import { RoleEntity } from '@/model/personnel/role/RoleEntity'
import { RoleService } from '@/model/personnel/role/RoleService'
import { useAirTable } from '@/airpower/hook/useAirTable'

async function onMenuEditor(role: RoleEntity) {
  AirDialog.show(RoleMenuEditor, role)
}

async function onPermissionEditor(role: RoleEntity) {
  AirDialog.show(RolePermissionEditor, role)
}

const {
  isLoading, response,
  onSearch, onAdd, onEdit, onDelete, onPageChanged, onDisable, onEnable,
} = useAirTable(RoleEntity, RoleService, {
  editView: RoleEditor,
})
</script>
<style lang="scss" scoped></style>
