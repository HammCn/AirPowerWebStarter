<script lang="ts" setup>
import { Bottom, ZoomIn } from '@element-plus/icons-vue'
import { PropType, ref } from 'vue'
import { ChatEventType } from '@/model/chat/websocket/enum/ChatEventType'
import { RoomMemberTextMessageEvent } from '@/model/chat/room/event/RoomMemberTextMessageEvent'
import { AirFile } from '@/airpower/helper/AirFile'
import { RoomMemberImageMessageEvent } from '@/model/chat/room/event/RoomMemberImageMessageEvent'
import { AirDateTime } from '@/airpower/helper/AirDateTime'
import ChatAvatar from '@/view/chat/components/ChatAvatar.vue'
import { RoomMemberEvent } from '@/model/chat/room/model/RoomMemberEvent'
import { AppConfig } from '@/config/AppConfig'
import { useEmoji } from '@/model/chat/hook/useEmoji'

defineProps({
  list: {
    type: Array as PropType<RoomMemberEvent[]>,
    default: () => [],
  },
})
const emits = defineEmits(['click'])

const bottom = ref<HTMLElement>()

const {
  getEmojiUrl, decodeEmojis, MESSAGE_STRING, MESSAGE_EMOJI,
} = useEmoji()

function getMessageClass(item: RoomMemberEvent) {
  const arr = []
  if (item.member.user.id === AppConfig.currentUser.value.id) {
    arr.push('from-me')
  }
  return arr.join(' ')
}

function autoScroll() {
  bottom.value?.scrollIntoView({
    behavior: 'smooth',
  })
}

function openNewTab(url: string) {
  window.open(url)
}
</script>

<template>
  <div
    id="messageHistory"
    class="history"
    @click="emits('click')"
    @scroll="autoScroll"
  >
    <template
      v-for="item in list"
      :key="item.id"
    >
      <div
        :class="getMessageClass(item)"
        class="message"
      >
        <ChatAvatar :url="item.member.user.avatar" />
        <div class="content">
          <div class="nick copy">
            {{ item.member.user.nickname }}
          </div>
          <el-dropdown trigger="click">
            <div
              v-if="ChatEventType.ROOM_TEXT_MESSAGE.equalsKey(item.type)"
              class="text copy"
            >
              <template
                v-for="(tempItem, index) in decodeEmojis((item as RoomMemberTextMessageEvent).text)"
                :key="index"
              >
                <template v-if="tempItem.type == MESSAGE_STRING">
                  {{ tempItem.str }}
                </template>
                <template v-if="tempItem.type ==MESSAGE_EMOJI">
                  <img :src="getEmojiUrl(tempItem.emoji)">
                </template>
              </template>
            </div>
            <div
              v-if="ChatEventType.ROOM_IMAGE_MESSAGE.equalsKey(item.type)"
              class="text img"
            >
              <el-image
                :src="AirFile.getStaticFileUrl((item as RoomMemberImageMessageEvent).img)"
                fit="cover"
                @load="autoScroll"
              >
                <template #error>
                  <div class="image-slot">
                    <i class="el-icon-picture-outline-round" />
                  </div>
                </template>
              </el-image>
            </div>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>
                  <el-icon>
                    <Bottom />
                  </el-icon>
                  撤回消息
                </el-dropdown-item>
                <el-dropdown-item
                  @click="openNewTab((item as RoomMemberImageMessageEvent).img)"
                >
                  <el-icon>
                    <ZoomIn />
                  </el-icon>
                  预览大图
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <div class="time">
            {{ AirDateTime.getFriendlyDateTime(item.time) }}
          </div>
        </div>
        <div class="space" />
      </div>
    </template>

    <div
      ref="bottom"
      class="bottom"
    />
  </div>
</template>

<style lang="scss" scoped>
.history {
  flex: 1;
  height: 0;
  overflow: hidden;
  overflow-y: auto;
  padding: 20px;
  position: relative;

  .message {
    display: flex;
    flex-direction: row;
    margin: 20px 0;
    text-align: left;
    padding-right: 60%;

    .content {
      margin-left: 20px;

      .nick {
        font-size: 15px;
        color: #666;
      }

      .text {
        background-color: #eee;
        font-size: 13px;
        color: #666;
        padding: 8px 16px;
        border-radius: 15px;
        margin-top: 10px;
        word-break: break-all;
        word-wrap: break-word;
        display: inline-block;
        position: relative;
        cursor: pointer;
        line-height: 18px;
        max-width: 300px;

        img {
          width: 20px;
          height: 20px;
        }

        * {
          display: inline-block;
          vertical-align: middle;
        }
      }

      .text::before {
        content: "";
        position: absolute;
        top: -5px;
        left: -13px;
        right: auto;
        width: 15px;
        height: 15px;
        border: 0 solid transparent;
        border-bottom: 12px currentColor;
        border-radius: 0 0 0 15px;
        color: #eee;
      }

      .img {
        padding: 2px;

        .el-image {
          border-radius: 15px;
          max-width: 200px;

          .el-image__inner {
            border-radius: 15px;
          }
        }
      }

      .time {
        font-size: 12px;
        color: #ccc;
        margin-top: 5px;
      }
    }

    .space {
      flex: 1;
      width: 0;
    }
  }

  .from-me {
    justify-content: flex-end;
    flex-direction: row-reverse;
    text-align: right;
    padding-right: 0;
    padding-left: 60%;

    .content {
      margin-right: 20px;
      margin-left: auto;
      text-align: right;

      .nick {
        text-align: right;
      }

      .text {
        background-color: #1295dd;
        color: #fff;
        text-align: left;
      }

      .text::before {
        content: "";
        position: absolute;
        top: -5px;
        left: auto;
        right: -13px;
        width: 15px;
        height: 15px;
        border: 0 solid transparent;
        border-bottom: 12px currentColor;
        border-radius: 0 0 15px 0;
        color: #1295dd;
      }
    }

    .time {
      text-align: right;
    }
  }

  .at-me {
    .content {
      .text {
        background-color: #333;
        color: white;
      }

      .text::before {
        color: #333;
      }
    }
  }

  .system {
    display: flex;
    flex-direction: row;
    text-align: center;
    padding: 0 20%;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    color: #aaa;
    margin-bottom: 10px;

    div {
      background-color: #eee;
      padding: 2px 8px;
      border-radius: 3px;
      max-width: 500px;
    }

    .user {
      cursor: pointer;
    }

    .user:hover {
      color: orangered;
    }
  }

  .roomNotice {
    text-align: center;
    margin-bottom: 10px;

    .card {
      display: inline-block;
      text-align: left;
      max-width: 500px;
      background: #eee;
      padding: 10px 15px;
      border-radius: 10px;
      color: #999;
      font-size: 13px;

      .title {
        font-size: 16px;
        color: #1295dd;
        display: inline-block;
        border-bottom: 2px dotted #1295dd;
        margin-bottom: 10px;
        padding-bottom: 5px;
      }

      .desc {
        word-break: break-all;
        word-wrap: break-word;
        margin: 0;
        overflow: hidden;
        white-space: pre-line;
      }
    }
  }
}
</style>
