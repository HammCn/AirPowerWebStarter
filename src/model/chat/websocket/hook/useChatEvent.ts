import { AirWebsocketEvent } from '@/airpower/websocket/AirWebSocketEvent'
import { IJson } from '@/airpower/interface/IJson'
import { ChatEventType } from '@/model/chat/websocket/enum/ChatEventType'
import { AppConfig } from '@/config/AppConfig'
import { AirClassTransformer } from '@/airpower/helper/AirClassTransformer'
import AirEvent from '@/airpower/event/AirEvent'

/**
 * # 聊天事件Hook
 * @author Hamm.cn
 */
export function useChatEvent() {
  /**
   * ## WebSocket事件转移
   * @param event 事件
   */
  const transferWebsocketEvent = (event: AirWebsocketEvent) => {
    let json: IJson
    const eventType = ChatEventType.get(event.payload.type)
    if (eventType?.eventModel && event.payload.data) {
      json = JSON.parse(event.payload.data)
      const data = AirClassTransformer.parse(json, eventType.eventModel)
      data.time = event.time
      AirEvent.emit(AppConfig.EVENT_PREFIX + event.payload.type, data)
      return
    }
    AirEvent.emit(AppConfig.EVENT_PREFIX + event.payload.type, event.payload.data)
  }
  return { transferWebsocketEvent }
}
