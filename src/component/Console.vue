<template>
  <AFrame :menu-list="menuList">
    <template #user>
      <AUser :user="currentUserInfo">
        <div>
          <AImage :src="currentUserInfo.avatar" />
        </div>
        你完全自定义的区域
        <template #setting>
          可选插槽
        </template>
      </AUser>
    </template>
    <router-view />
  </AFrame>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { AFrame, AUser, AImage } from '@/airpower/component'
import { AirConfig } from '@/airpower/config/AirConfig'
import { AirRouter } from '@/airpower/helper/AirRouter'
import { AirMenuEntity } from '@/airpower/model/entity/AirMenuEntity'
import { AirUserEntity } from '@/airpower/model/entity/AirUserEntity'
import { AirRand } from '@/airpower/helper/AirRand'

const currentUserInfo = ref(new AirUserEntity())
const menuList = ref([] as AirMenuEntity[])

async function getMenuList() {
  menuList.value = []
  menuList.value.push(new AirMenuEntity(1).setName('首页').setPath('/console').setComponent('/console/index/index'))
  menuList.value.push(new AirMenuEntity(2).setName('表格示例').setChildren([
    new AirMenuEntity(21).setName('树表格').setPath('/console/material/tree'),
    new AirMenuEntity(22).setName('普通表格').setPath('/console/material/list'),
    new AirMenuEntity(22).setName('更多表格').setChildren([
      new AirMenuEntity(221).setName('孙子菜单').setPath('/console/material').setComponent('/console/material/list'),
    ]),
  ]))
  menuList.value.push(new AirMenuEntity(AirRand.getRandNumber(1000, 9999)).setName('权限管理').setPath('/console/permission/list'))
  menuList.value.push(new AirMenuEntity(AirRand.getRandNumber(1000, 9999)).setName('用户管理').setPath('/console/user/list'))
  menuList.value.push(new AirMenuEntity(AirRand.getRandNumber(1000, 9999)).setName('角色管理').setPath('/console/role/list'))
  AirRouter.initVueRouter(menuList.value, 'console')
}

async function init() {
  currentUserInfo.value.nickname = 'Hamm'
  currentUserInfo.value.avatar = 'https://cdn.hamm.cn/img/logo.png'
  AirConfig.permissionList = []
  await getMenuList()
}

init()
</script>
<style scoped lang="scss">
.logo {
  text-decoration: none;
  color: white;
}
</style>
