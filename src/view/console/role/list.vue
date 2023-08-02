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
      :data-list="list"
      hide-select
      :entity="RoleEntity"
      :disable-delete="(row: RoleEntity) => row.isSystem"
      :ctrl-width="105"
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
      </template>
    </ATable>
  </APanel>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import {
  AButton,
  APanel, ATable, AToolBar,
} from '@/airpower/component'
import { AirDialog } from '@/airpower/helper/AirDialog'
import { RoleEditor, RoleMenuEditor } from './component'
import { AirRequestPage } from '@/airpower/model/AirRequestPage'
import { RoleEntity } from '@/model/role/RoleEntity'
import { RoleService } from '@/model/role/RoleService'

const isLoading = ref(false)
const request = ref(new AirRequestPage(RoleEntity))
const list = ref([] as RoleEntity[])

async function getList() {
  list.value = await RoleService.create(isLoading).getList(request.value)
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

getList()

</script>
<style scoped lang="scss"></style>
