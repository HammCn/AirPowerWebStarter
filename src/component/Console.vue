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
import { MenuEntity } from '@/model/menu/MenuEntity'
import { UserService } from '@/model/user/UserService'
import { PermissionEntity } from '@/model/permission/PermissionEntity'
import { AirWebsocket } from '@/airpower/websocket/AirWebSocket'
import { AirNotification } from '@/airpower/feedback/AirNotification'
import { UserEntity } from '@/model/user/UserEntity'

const currentUserInfo = ref(new UserEntity())
const menuList = ref([] as MenuEntity[])
const isLoading = ref(false)

async function getMenuList() {
  menuList.value = await UserService.create(isLoading).getMyMenuList()
  AirRouter.initVueRouter(menuList.value, 'console')
}

function getPermissionList(permissionList: PermissionEntity[]): string[] {
  let list: string[] = []
  permissionList.forEach((item) => {
    list.push(item.identity)
    if (item.children && item.children.length > 0) {
      list = list.concat(getPermissionList(item.children))
    }
  })
  return list
}

async function init() {
  currentUserInfo.value = await UserService.create().getMyInfo()
  AirConfig.permissionList = []

  const permissionList = await UserService.create(isLoading).getMyPermissionList()
  AirConfig.permissionList = getPermissionList(permissionList)
  await getMenuList()

  AirWebsocket.create({
    onmessage(message) {
      // eslint-disable-next-line no-console
      console.log(message)
    },
    onopen() {
      AirNotification.success('Websocket连接成功')
    },
  })
}

init()
</script>
<style scoped lang="scss">
.logo {
  text-decoration: none;
  color: white;
}
</style>
