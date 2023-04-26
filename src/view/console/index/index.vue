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
        v-model.name="materialInfo.name"
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
        src="https://cdn.hamm.cn/static/img/logo/1024.png"
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
import { ref, computed } from 'vue'
import {
  APanel, AInput, AButton, AImage,
} from '@/airpower/component'
import { AirAlert } from '@/airpower/feedback/AirAlert'
import { AirRecord } from '@/airpower/model/AirRecord'
import { MaterialEntity } from '@/entity/MaterialEntity'
import { appStore } from '@/config/store'
import { AirDialogHelper } from '@/airpower/helper/AirDialogHelper'
import { MaterialService } from '@/service/MaterialService'
import { AirFileEntity } from '@/airpower/dto/AirFileEntity'

const hello = computed(() => appStore().$state.hello)

const newHello = () => {
  appStore().newHello()
}

function uploadSuccess(data: AirFileEntity) {
  // eslint-disable-next-line no-console
  console.log(data)
}
const materialInfo = ref(new MaterialEntity())

const departmentTreeData = ref([] as AirRecord[])

function initTree(): AirRecord[] {
  const list: AirRecord[] = []
  list.push(new AirRecord().setKey(1)
    .setLabel('测试1'))
  list.push(new AirRecord().setKey(2)
    .setLabel('测试2')
    .setChildren([
      new AirRecord().setKey(21)
        .setLabel('测试21'),
      new AirRecord().setKey(22)
        .setLabel('测试22'),
      new AirRecord().setKey(23)
        .setLabel('测试23')
        .setChildren([
          new AirRecord().setKey(231)
            .setLabel('测试231'),
          new AirRecord().setKey(232)
            .setLabel('测试232'),
        ]),
    ]))
  list.push(new AirRecord().setKey(3)
    .setLabel('测试3')
    .setChildren([
      new AirRecord().setKey(31)
        .setLabel('测试31'),
      new AirRecord().setKey(32)
        .setLabel('测试32')
        .setChildren([
          new AirRecord().setKey(321)
            .setLabel('测试321'),
          new AirRecord().setKey(322)
            .setLabel('测试322'),
        ]),
      new AirRecord().setKey(33)
        .setLabel('测试33')
        .setChildren([
          new AirRecord().setKey(331)
            .setLabel('测试321'),
          new AirRecord().setKey(332)
            .setLabel('测试322'),
        ]),
    ]))
  list.push(new AirRecord().setKey(4)
    .setLabel('测试3'))
  return list
}
departmentTreeData.value = initTree()
function change(data: MaterialEntity) {
  // eslint-disable-next-line no-console
  console.log(data)
}
function upload() {
  AirDialogHelper.showUpload()
}

function test() {
  // eslint-disable-next-line no-console
  console.log(materialInfo.value.toSourceString())
}
const loading = ref(false)
async function getById() {
  await new MaterialService(loading).getDetail(1)
}

async function customAlert() {
  await new AirAlert(`
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
  `).setTitle('哈哈哈')
    .enableHtml()
    .setWidth(800)
    .show()
  await new AirAlert('带我去好滴哦我去红歌会i哦亲无花果i哦还欠我i哦活该i哦清河湾').setTitle('哈哈哈')
    .success()
}
</script>
<style scoped lang="scss"></style>
