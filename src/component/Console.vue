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
import { AirUserEntity } from '@/airpower/model/entity/AirUserEntity'
import { MenuService } from '@/model/menu/MenuService'
import { AirRequest } from '@/airpower/model/AirRequest'
import { MenuEntity } from '@/model/menu/MenuEntity'
import { AirSort } from '@/airpower/model/AirSort'

const currentUserInfo = ref(new AirUserEntity())
const menuList = ref([] as MenuEntity[])

const isLoading = ref(false)

async function getMenuList() {
  const request = new AirRequest(MenuEntity).setSort(new AirSort().setField('orderNo'))
  menuList.value = await MenuService.create(isLoading).getList(request)
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
