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
import { Ref, ref } from 'vue'
import { AFrame, AUser, AImage } from '@/airpower/component'
import { AirConfig } from '@/airpower/AirConfig'
import { AirRouter } from '@/airpower/helper/AirRouter'
import { AirUserEntity } from '@/airpower/dto/AirUserEntity'
import { AirMenuEntity } from '@/airpower/dto/AirMenuEntity'
import { AirClassTransformer } from '@/airpower/helper/AirClassTransformer'

const currentUserInfo: Ref<AirUserEntity> = ref(new AirUserEntity())
const menuList: Ref<AirMenuEntity[]> = ref([])

async function getMenuList() {
  const data = '[{"id":1,"children":[],"name":"首页","path":"/console","icon":"icon-commonicon_shanchu airpower","component":"/console/index/index","isHide":false},{"id":2,"children":[],"name":"物料列表","path":"/console/material","icon":"icon-commonicon_shanchu airpower","component":"/console/material/list","isHide":false},{"id":31,"children":[{"id":331,"children":[],"name":"子菜单1","path":"/console/user/tree","component":"/console/user/tree","isHide":false}],"name":"子菜单列表","icon":"icon-commonicon_shanchu airpower","isHide":false},{"id":4,"children":[],"name":"AirHttp","path":"/console/demo/http","icon":"icon-commonicon_shanchu airpower","component":"/console/demo/http","isHide":false}]'
  menuList.value = AirClassTransformer.parseArray(JSON.parse(data), AirMenuEntity)
  AirRouter.initVueRouter(menuList.value, 'console')
}

async function init() {
  currentUserInfo.value.nickname = 'Hamm'
  currentUserInfo.value.avatar = 'https://cdn.hamm.cn/static/img/logo/1024.png'
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
