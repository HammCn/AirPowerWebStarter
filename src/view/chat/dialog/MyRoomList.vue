<template>
  <ADialog
    :allow-fullscreen="false"
    :loading="isLoading"
    height="600px"
    hide-confirm
    title="我的房间"
    width="400px"
    @on-cancel="onCancel"
    @on-confirm="onConfirm"
  >
    <template #middleButton>
      <AButton
        primary
        type="ADD"
        @click="onAdd"
      >
        创建房间
      </AButton>
    </template>
    <RoomList
      :room-list="hotRoomList"
      @join-room="onConfirm"
    />
  </ADialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import CreateRoom from './CreateRoom.vue'
import { AButton, ADialog } from '@/airpower/component'
import { airProps } from '@/airpower/config/AirProps'
import { RoomEntity } from '@/model/chat/room/RoomEntity'
import { RoomService } from '@/model/chat/room/RoomService'
import { AirDialog } from '@/airpower/helper/AirDialog'
import RoomList from '@/view/chat/dialog/list/RoomList.vue'

defineProps(airProps())

const hotRoomList = ref([] as RoomEntity[])

const isLoading = ref(false)

async function getHotRooms() {
  hotRoomList.value = await RoomService.create(isLoading).getMyRoomList()
}

async function onAdd() {
  await AirDialog.show(CreateRoom)
  await getHotRooms()
}

getHotRooms()
</script>

<style lang="scss" scoped>
</style>
