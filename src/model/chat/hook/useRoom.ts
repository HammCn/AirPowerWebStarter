import { RoomMemberTextMessageEvent } from '../room/event/RoomMemberTextMessageEvent'
import { RoomMemberJoinEvent } from '../room/event/RoomMemberJoinEvent'
import { RoomMemberLeaveEvent } from '../room/event/RoomMemberLeaveEvent'
import AirEvent from '@/airpower/event/AirEvent'
import { AppConfig } from '@/config/AppConfig'
import { ChatEventType } from '@/model/chat/websocket/enum/ChatEventType'

/**
 * ## 房间元素Hook
 * @author Hamm.cn
 */
export function useRoom() {
  /**
   * ## 监听事件
   */
  function listenEvents() {
    // 房间消息
    AirEvent.on(AppConfig.EVENT_PREFIX + ChatEventType.ROOM_TEXT_MESSAGE.key, (event: RoomMemberTextMessageEvent) => {
      console.log(event)
    })

    // 离开房间
    AirEvent.on(AppConfig.EVENT_PREFIX + ChatEventType.ROOM_MEMBER_LEAVE.key, (event: RoomMemberLeaveEvent) => {
      console.log(event)
    })

    // 加入房间
    AirEvent.on(AppConfig.EVENT_PREFIX + ChatEventType.ROOM_MEMBER_JOIN.key, (event: RoomMemberJoinEvent) => {
      console.log(event)
    })
  }

  listenEvents()

  return {}
}
