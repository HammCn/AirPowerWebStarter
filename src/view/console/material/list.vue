<template>
  <ATreeBox
    :tree-data="treeData"
    searchable
    default-expand-all
    @on-change="treeDataChanged"
  >
    <APanel>
      <AToolBar
        :loading="isLoading"
        :entity="MaterialEntity"
        :service="MaterialService"
        show-import
        @on-add="onAdd()"
        @on-search="request = $event; getList()"
      />
      <ATable
        v-loading="isLoading"
        :data-list="response.list"
        hide-select
        show-detail
        show-add
        :entity="MaterialEntity"
        :ctrl-width="130"
        :disable-delete="(row: MaterialEntity) => {
          return row.id / 3 === 0
        }
        "
        @on-detail="onDetail"
        @on-edit="onEdit"
        @on-delete="onDelete"
        @on-add="onRowAdd"
        @on-sort-change=" request.sort = $event; getList()"
      />
      <template #footerLeft>
        <APage
          :response="response"
          @on-change="
            request.page = $event;
            getList()
          "
        />
      </template>
    </APanel>
  </ATreeBox>
</template>

<script lang="ts" setup>
import { Ref, ref } from 'vue'
import {
  ATreeBox, APanel, APage, ATable, AToolBar,
} from '@/airpower/component'
import { MaterialEntity } from '@/entity/MaterialEntity'
import EditView from './edit.vue'
import { MaterialService } from '@/service/MaterialService'
import { AirDialog } from '@/airpower/helper/AirDialog'
import { MaterialDetail } from '@/component/detail'
import { AirResponsePage } from '@/airpower/dto/AirResponsePage'
import { AirRequestPage } from '@/airpower/dto/AirRequestPage'
import { AirRand } from '@/airpower/helper/AirRand'
import { ITree } from '@/airpower/interface/ITree'

const isLoading = ref(false)
const service = new MaterialService(isLoading)
const response = ref(new AirResponsePage<MaterialEntity>())
const request = ref(new AirRequestPage<MaterialEntity>())

async function getList() {
  response.value = await service.getPage(request.value)
}

function onRowAdd(row: MaterialEntity) {
  // eslint-disable-next-line no-console
  console.log('Row add event', row)
}

async function onEdit(row: MaterialEntity) {
  await AirDialog.show(EditView, row)
  getList()
}

async function onDelete(data: MaterialEntity) {
  await service.delete(data.id, '删除物料成功')
  getList()
}

async function onAdd() {
  await AirDialog.show(EditView)
  getList()
}

async function onDetail(data: MaterialEntity) {
  await AirDialog.show(MaterialDetail, data)
  getList()
}

getList()

const treeData = ref([] as ITree[])
function getTreeData() {
  for (let i = 1; i <= 10; i += 1) {
    const children = [] as ITree[]
    if (i % 3 === 0) {
      for (let j = 1; j <= 10; j += 1) {
        const children1 = [] as ITree[]
        if (j % 3 === 0) {
          const children2 = [] as ITree[]
          for (let k = 1; k <= 10; k += 1) {
            children1.push({
              id: parseInt(AirRand.getRandNumberString(6)),
              name: `我是孙子节点${k}`,
              children: children2,
            } as ITree)
          }
        }
        children.push({
          id: parseInt(AirRand.getRandNumberString(6)),
          name: `我是子节点${j}`,
          children: children1,
        } as ITree)
      }
    }
    treeData.value.push({
      id: parseInt(AirRand.getRandNumberString(6)),
      name: `我是根节点${i}`,
      children,
    } as ITree)
  }
}

const currentTreeData: Ref<ITree | undefined> = ref()
function treeDataChanged(tree: ITree | undefined) {
  currentTreeData.value = tree
  console.log('currentTreeData', currentTreeData.value)
}
getTreeData()
</script>
<style scoped lang="scss"></style>
