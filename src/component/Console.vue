<template>
  <AFrame :menu-list="menuList">
    <template #logo>
      <img
        :src="airpower"
        height="40"
        class="logo"
      >
    </template>
    <template #user>
      {{ currentUserInfo.nickname }}
      <AUser :user="currentUserInfo">
        <div>
          <AImage :src="currentUserInfo.avatar" />
        </div>
        <AInput
          v-model.nickname="currentUserInfo.nickname"
          :tree="menuList"
          :entity="UserEntity"
        />
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
import {
  AFrame, AImage, AInput, AUser,
} from '@/airpower/component'
import { AirConfig } from '@/airpower/config/AirConfig'
import { AirRouter } from '@/airpower/helper/AirRouter'
import { MenuEntity } from '@/model/menu/MenuEntity'
import { UserService } from '@/model/user/UserService'
import { UserEntity } from '@/model/user/UserEntity'
import airpower from '@/airpower/assets/img/airpower.svg'
import { AirWebsocket } from '@/airpower/websocket/AirWebSocket'
import { AirNotification } from '@/airpower/feedback/AirNotification'
import { AirPermission } from '@/airpower/helper/AirPermission'

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
<style scoped lang="scss">
.logo {
  text-decoration: none;
  color: white;
  margin-top: 5px;
}
</style>
