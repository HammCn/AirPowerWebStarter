<template>
  <APanel>
    <div>
      {{ hello }}
      <el-button
        type="primary"
        @click="newHello()"
      >
        newWorld
      </el-button>
      <router-link to="/login">
        登录
      </router-link>|
      <router-link to="/404">
        404
      </router-link>
      <hr>
      <AInput
        v-model.materialName="materialInfo.materialName"
        :entity="MaterialEntity"
        @change="change"
      />
      <br><br>
      <AInput
        v-model.remark="materialInfo.remark"
        :entity="MaterialEntity"
      />
      <br><br>
      <AImage
        :upload="true"
        src="https://cdn.hamm.cn/img/logo.png"
        @on-upload="uploadSuccess"
      />
      <br><br>
      <el-button
        type="primary"
        @click="test()"
      >
        打印控制台数据
      </el-button>
      <br><br>
      <el-button
        type="primary"
        @click="upload()"
      >
        上传文件
      </el-button>
      <br><br>
      <AButton
        icon-button
        type="CLOSE"
        primary
        @click="customAlert()"
      >
        自定义弹窗
      </AButton>
      <br><br>
      <el-button
        v-loading="loading"
        type="primary"
        @click="getById()"
      >
        测试Loading
      </el-button>
      {{ loading }}
      <br><br>
      {{ materialInfo }}
      <div />
    </div>
  </APanel>
</template>

<script lang="ts" setup>
import { ref, computed, watch } from 'vue'
import {
  APanel, AInput, AButton, AImage,
} from '@/airpower/component'
import { AirAlert } from '@/airpower/feedback/AirAlert'
import { AirDictionary } from '@/airpower/model/AirDictionary'
import { MaterialEntity } from '@/model/entity/MaterialEntity'
import { appStore } from '@/config/store'
import { AirDialog } from '@/airpower/helper/AirDialog'
import { MaterialService } from '@/service/MaterialService'
import { AirRand } from '@/airpower/helper/AirRand'
import { AirFileEntity } from '@/airpower/model/entity/AirFileEntity'

const hello = computed(() => appStore().hello)

const newHello = () => {
  appStore().hello = AirRand.getRandCharString()
}

watch(() => appStore().hello, () => {
  // eslint-disable-next-line no-console
  console.log('watch', appStore().hello)
})

function uploadSuccess(data: AirFileEntity) {
  // eslint-disable-next-line no-console
  console.log(data)
}
const materialInfo = ref(new MaterialEntity())

const departmentTreeData = ref([] as AirDictionary[])

function initTree(): AirDictionary[] {
  const list: AirDictionary[] = []
  list.push(new AirDictionary(1, '测试1'))
  list.push(new AirDictionary(2, '测试2')
    .setChildren([
      new AirDictionary(21, '测试21'),
      new AirDictionary(22, '测试22'),
      new AirDictionary(23, '测试23')
        .setChildren([
          new AirDictionary(231, '测试231'),
          new AirDictionary(232, '测试232'),
        ]),
    ]))
  list.push(new AirDictionary(3, '测试3')
    .setChildren([
      new AirDictionary(31, '测试31'),
      new AirDictionary(32, '测试32')
        .setChildren([
          new AirDictionary(321, '测试321'),
          new AirDictionary(322, '测试322'),
        ]),
      new AirDictionary(33, '测试33')
        .setChildren([
          new AirDictionary(331, '测试321'),
          new AirDictionary(332, '测试322'),
        ]),
    ]))
  list.push(new AirDictionary(4, '测试3'))
  return list
}
departmentTreeData.value = initTree()
function change(data: MaterialEntity) {
  // eslint-disable-next-line no-console
  console.log(data)
}
function upload() {
  AirDialog.showUpload()
}

function test() {
  // eslint-disable-next-line no-console
  console.log(materialInfo.value.toJson())
}
const loading = ref(false)
async function getById() {
  await MaterialService.create(loading).getDetail(1)
}

async function customAlert() {
  await AirAlert.create()
    .enableHtml()
    .setWidth(800)
    .show(`
  <div style="height:500px;overflow:hidden;overflow-y:auto;">
  <h1>Hello</h1><br>
  <div>带我<br/>去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的</div>
  <div>带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的</div>
  <div>带我去的带我去的带我去的带我去的<br>带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的</div>
  <div>带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的</div>
  <div>带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的</div>
  <div>带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的</div>
  <div>带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的</div>
  <div>带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的</div>
  <div>带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的</div>
  <div>带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的</div>
  <div>带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的</div>
  <div>带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的</div>
  <div>带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的</div>
  <div>带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的</div>
  <div>带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的</div>
  <div>带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的</div>
  <div>带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的</div>
  <div>带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的</div>
  <div>带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的</div>
  <div>带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的</div>
  <div>带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的</div>
  <div>带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的带我去的</div>
  </div>
  `, '自定义的HTML')
  await AirAlert.success('自定义的内容', '自定义的标题')
}
</script>
<style scoped lang="scss"></style>
