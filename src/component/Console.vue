<template>
  <AFrame
    :header-height="50"
    :menu-list="menuList"
  >
    <template #logo>
      <img
        class="logo"
        height="40"
        src="@/assets/img/logo.png"
      >
    </template>
    <template #user>
      <UserCard :user="currentUserInfo" />
    </template>
    <router-view />
  </AFrame>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { AFrame } from '@/airpower/component'
import { AirConfig } from '@/airpower/config/AirConfig'
import { AirRouter } from '@/airpower/helper/AirRouter'
import { MenuEntity } from '@/model/menu/MenuEntity'
import { UserService } from '@/model/user/UserService'
import { UserEntity } from '@/model/user/UserEntity'
import { AirWebsocket } from '@/airpower/websocket/AirWebSocket'
import { AirNotification } from '@/airpower/feedback/AirNotification'
import { AirPermission } from '@/airpower/helper/AirPermission'
import UserCard from '@/component/UserCard.vue'

const currentUserInfo = ref(new UserEntity())
const menuList = ref<MenuEntity[]>([])
const isLoading = ref(false)

async function getMenuList() {
  menuList.value = await UserService.create(isLoading).getMyMenuList()
  AirRouter.initVueRouter(menuList.value, 'console')
}

async function init() {
  currentUserInfo.value = await UserService.create().getMyInfo()
  let permissions = AirPermission.getList()
  if (permissions.length === 0) {
    permissions = await UserService.create(isLoading).getMyPermissionList()
  }
  AirPermission.saveList(permissions)
  await getMenuList()

  AirWebsocket.create(`${AirConfig.websocketUrl}?${AirConfig.getAccessToken()}`, {
    onConnect() {
      AirNotification.success('连接成功')
    },
    onMessage(event) {
      AirNotification.success(`${event.payload.type} ${event.payload.data}`, event.id)
    },
  })
}

init()

</script>
<style lang="scss" scoped>
.logo {
  text-decoration: none;
  color: white;
  margin-top: 5px;
}
</style>
