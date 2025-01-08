<script lang="ts" setup>
import { Ref, ref } from 'vue'
import { AppConfig } from '@/config/AppConfig'
import UserCenter from '@/view/chat/panel/UserCenter.vue'
import { UserService } from '@/model/user/UserService'
import { DialogStatus } from '@/model/chat/DialogStatus'
import Emoji from '@/view/chat/panel/Emoji.vue'
import { AirWebsocket } from '@/airpower/websocket/AirWebSocket'
import { AirConfig } from '@/airpower/config/AirConfig'
import { useCurrentRoom } from '@/model/chat/hook/useCurrentRoom'
import { useRoomTextMessage } from '@/model/chat/hook/useRoomTextMessage'
import { useChatEvent } from '@/model/chat/websocket/hook/useChatEvent'
import { ChatEventType } from '@/model/chat/websocket/enum/ChatEventType'
import AirEvent from '@/airpower/event/AirEvent'
import { RoomMemberTextMessageEvent } from '@/model/chat/room/event/RoomMemberTextMessageEvent'
import { RoomMemberEvent } from '@/model/chat/room/model/RoomMemberEvent'
import RoomChatList from '@/view/chat/components/RoomChatList.vue'
import ChatFormTool from '@/view/chat/components/ChatFormTool.vue'
import RoomTop from '@/view/chat/components/RoomTop.vue'

const isLoading = ref(false)

const websocket: Ref<AirWebsocket | undefined> = ref()

const messageList: Ref<RoomMemberEvent[]> = ref([])

const messageDom = ref<HTMLTextAreaElement | null>(null)

const { sendTextMessage } = useRoomTextMessage()

const { transferWebsocketEvent } = useChatEvent()

const { joinRoom, onLeaveRoom } = useCurrentRoom(websocket)
const isShowScrollDown = ref(false)

const message = ref('')

async function init() {
  AppConfig.currentUser.value = await UserService.create(isLoading).getMyInfo()

  websocket.value = AirWebsocket.create(`${AirConfig.websocketUrl}?${AirConfig.getAccessToken()}`, {
    onConnect() {
      joinRoom()
    },
    onMessage(event) {
      // 将 WebSocket 事件传到项目的 事件中心
      transferWebsocketEvent(event)
    },
  })

  // 监听离开房间事件
  onLeaveRoom(websocket)

  // 监听离开房间成功后 进入默认房间
  AirEvent.on(AppConfig.EVENT_PREFIX + ChatEventType.ROOM_LEAVE_SUCCESS.key, () => {
    joinRoom(AppConfig.getLastRoomCode())
  })

  // 监听离开房间成功后 进入默认房间
  AirEvent.on(AppConfig.EVENT_PREFIX + ChatEventType.ROOM_TEXT_MESSAGE.key, (event: RoomMemberTextMessageEvent) => {
    event.type = ChatEventType.ROOM_TEXT_MESSAGE.key
    messageList.value.push(event)
  })
}

init()

const dialogStatus = ref(DialogStatus.NONE)

function openPanel(what?: DialogStatus) {
  dialogStatus.value = what || DialogStatus.NONE
}

function sendMessage() {
  if (!message.value) {
    return
  }
  const temp = message.value
  message.value = ''
  sendTextMessage(websocket, temp)
  openPanel()
}

function keydown(e: KeyboardEvent) {
  switch (e.key) {
    case 'Enter':
      sendMessage()
      e.preventDefault()
      break
    default:
  }
}

</script>
<template>
  <div
    v-loading="!AppConfig.currentUser"
    class="room"
  >
    <div
      class="room-body"
    >
      <RoomTop
        @open="openPanel($event)"
      />
      <div class="chat">
        <RoomChatList
          :list="messageList"
          @click="openPanel"
        />

        <div class="chat-form">
          <ChatFormTool @open="openPanel($event)" />
          <el-button
            v-if="isShowScrollDown"
            class="scroll-button"
            type="danger"
          >
            有新消息
          </el-button>
          <div class="chat-input">
            <textarea
              ref="messageDom"
              v-model="message"
              placeholder=""
              @click="openPanel()"
              @keydown="keydown"
            />
          </div>
        </div>
      </div>
      <transition-group name="slide">
        <!--        <SongPicker-->
        <!--          v-if="dialogs.songPicker"-->
        <!--          :key="songPicker"-->
        <!--          :room_id="room_id"-->
        <!--        />-->
        <!--        <MySong-->
        <!--          v-if="dialogs.mySong"-->
        <!--          :key="mySong"-->
        <!--          :room_id="room_id"-->
        <!--        />-->
        <UserCenter
          v-if="DialogStatus.USER_CENTER.equalsKey(dialogStatus.key)"
          @update="openPanel"
        />
        <!--        <RoomList-->
        <!--          v-if="dialogs.roomList && myInfo"-->
        <!--          :key="roomList"-->
        <!--          :user-info="myInfo"-->
        <!--          @update="confirmToChangeRoom"-->
        <!--          @create-room="hideTo('roomCreate')"-->
        <!--          @return2-my-room="changeToMyRoom"-->
        <!--        />-->
        <!--        <Online-->
        <!--          v-if="dialogs.online && roomInfo && myInfo"-->
        <!--          :key="online"-->
        <!--          :online-list="onlineList"-->
        <!--          :room-info="roomInfo"-->
        <!--          :user-info="myInfo"-->
        <!--          @at="atUser"-->
        <!--          @profile="showUserProfile"-->
        <!--        />-->
        <!--        <SongWaiting-->
        <!--          v-if="dialogs.songWaiting && room_id"-->
        <!--          :key="songWaiting"-->
        <!--          :room_id="room_id"-->
        <!--          :song-list="songList"-->
        <!--        />-->
        <!--        <RoomSetting-->
        <!--          v-if="dialogs.roomSetting"-->
        <!--          :key="roomSetting"-->
        <!--          :room_id="room_id"-->
        <!--          @update="hideTo"-->
        <!--        />-->
        <!--        <RoomCreate-->
        <!--          v-if="dialogs.roomCreate"-->
        <!--          :key="roomCreate"-->
        <!--          @close="hideTo"-->
        <!--          @created="-->
        <!--            getMyInfo(() => {-->
        <!--              changeToMyRoom();-->
        <!--            })-->
        <!--          "-->
        <!--        />-->
        <Emoji
          v-if="DialogStatus.EMOJI.equalsKey(dialogStatus.key)"
          @click="message+= `[emoji${$event}]`;messageInput?.focus()"
        />
        <!--        <Profile-->
        <!--          v-if="dialogs.profile"-->
        <!--          :key="profile"-->
        <!--          :user-id="profileUserId"-->
        <!--          @close="hideTo"-->
        <!--        />-->
        <!--        <div class="highest">-->
        <!--          <div-->
        <!--            v-if="tipsVolumeShow"-->
        <!--            class="volume"-->
        <!--          >-->
        <!--            <i-->
        <!--              :class="-->
        <!--                audioVolume == 0-->
        <!--                  ? 'icon-changyongtubiao-xianxingdaochu-zhuanqu-40'-->
        <!--                  : 'icon-changyongtubiao-xianxingdaochu-zhuanqu-39'-->
        <!--              "-->
        <!--              class="iconfont"-->
        <!--            />-->
        <!--            <span> {{ audioVolume }}</span>-->
        <!--          </div>-->
        <!--        </div>-->
      </transition-group>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.room {
  .room-body {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: #fff;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    overflow: hidden;
    display: flex;
    flex-direction: column;

    .chat {
      flex: 1;
      display: flex;
      flex-direction: column;
      position: relative;
      height: 0;

      .chat-form {
        border-top: 1px solid #eee;
        display: flex;
        flex-direction: column;
        position: relative;

        .progress {
          height: 2px;
          position: relative;

          div {
            position: absolute;
            left: 0;
            top: 0;
            bottom: 0;
            border-radius: 10px;
            background: #fff;
            background: -webkit-linear-gradient(to left, #4493d7, #ffffff);
            background: linear-gradient(to left, #4493d7, #ffffff);
          }
        }

        .scroll-button {
          position: absolute;
          right: 10px;
          top: -40px;
        }

        .chat-input {
          padding: 0 10px 10px 18px;
          overflow: hidden;
          position: relative;

          textarea {
            height: 80px;
            width: 100%;
            resize: none;
            outline: none;
            border: none;
            font-size: 13px;
            background-color: transparent;
          }

          .lrc {
            font-size: 12px;
            color: #ccc;
            display: flex;
            flex-direction: row;

            .iconfont {
              color: #999;
              margin-right: 3px;
            }
          }
        }

        .chat-bottom {
          display: flex;
          flex-direction: row;
          position: relative;
        }
      }
    }
  }

  .highest {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    pointer-events: none;

    .volume {
      pointer-events: auto;
      display: flex;
      flex-direction: row;
      background-color: rgba(0, 0, 0, 0.05);
      backdrop-filter: blur(20px);
      color: #999;
      padding: 50px;
      border-radius: 20px;
      align-items: center;

      .iconfont {
        font-size: 88px;
        text-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      }

      span {
        font-size: 64px;
        text-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      }
    }
  }
}
</style>
