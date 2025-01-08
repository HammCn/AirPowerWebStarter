import { Ref } from 'vue'
import { AirWebsocket } from '@/airpower/websocket/AirWebSocket'
import { AirWebSocketPayload } from '@/airpower/websocket/AirWebSocketPayload'
import { ChatEventType } from '@/model/chat/websocket/enum/ChatEventType'

/**
 * # 房间文本消息
 * @author Hamm.cn
 */
export function useRoomTextMessage() {
  /**
   * ## 发送消息
   * @param websocket WebSocket
   * @param message 消息
   */
  function sendTextMessage(websocket: Ref<AirWebsocket | undefined>, message: string) {
    if (!websocket.value?.isConnected) {
      return
    }
    const payload = new AirWebSocketPayload()
    payload.type = ChatEventType.ROOM_TEXT_MESSAGE.key
    payload.data = message
    websocket.value.send(payload)
  }

  return {
    sendTextMessage,
  }
}
