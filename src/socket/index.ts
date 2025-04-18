import { base_ip, ws_port, ws_path } from '@/constants/http';
import Taro from '@tarojs/taro';



export class WebsocketClient {

  private connect_status: boolean;
  private open_status: boolean;
  private msg_queue: WSMessageItem[] = [];
  private handlers: Map<string, Set<WSMessageHandler>> = new Map();

  private static instance: WebsocketClient;

  private constructor() { }

  static getInstance(): WebsocketClient {
    if (!WebsocketClient.instance) {
      WebsocketClient.instance = new WebsocketClient();
    }
    return WebsocketClient.instance;
  }

  connect() {
    this.connect_status = true;
    this.open_status = false;
    this.handlers = new Map();

    this.innerConnect();
  }

  private async innerConnect() {
    console.log('connecting to WebSocket server');
    Taro.connectSocket({
      url: `ws://${base_ip}:${ws_port}${ws_path}`,
      header: {
        Authorization: Taro.getStorageSync('Authorization'),
        'x-unique-device-token': Taro.getStorageSync('x-unique-device-token'),
        'x-user-uuid': Taro.getStorageSync('x-user-uuid')
      }
    })

    Taro.onSocketOpen(() => {
      console.log('socket opened');
      this.open_status = true;
      this.msg_queue.forEach((msg) => {
        this.sendMessage(msg);
      })
      this.msg_queue = [];
    })

    Taro.onSocketClose(() => {
      console.log('socket closed');
      this.open_status = false;
      this.connect_status = false;

      // 每10秒尝试一次重连
      const interval = setInterval(() => {
        if (this.connect_status) {
          clearInterval(interval);
          return;
        }
        this.connect();
      }, 10 * 1000);
    })

    Taro.onSocketMessage((res) => {
      try {
        const { event, message } = JSON.parse(res.data) as WSMessageItem;
        this.dispatch(event, message);
      } catch (error) {
        console.error('Failed to parse WebSocket message', error);
      }
    })
  }


  private sendMessage(message: WSMessageItem) {
    if (!this.connect_status) throw new Error('WebSocket not connected');
    if (this.open_status) {
      Taro.sendSocketMessage({
        data: JSON.stringify(message)
      })
    } else {
      this.msg_queue.push(message);
    }
  }

  registerHandler(event: EventType, handler: WSMessageHandler) {
    if (!this.handlers.has(event)) {
      this.handlers.set(event, new Set());
    }
    this.handlers.get(event)?.add(handler);
  }

  unregisterHandler(event: EventType, handler: WSMessageHandler) {
    if (this.handlers.has(event)) {
      this.handlers.get(event)?.delete(handler);
    }
  }


  sendPrivateMessage(options: {
    type: MessageType, content: MessageContentMap, sender: string, receiver: string,
    callback?: () => void
  }) {
    const { type, content, sender, receiver } = options;
    const messageItem = this.createMessageItem("send_message", {
      sender: sender,
      receiver: receiver,
      content,
      type,
    });
    Client.sendMessage(messageItem);
    options.callback?.();
  };

  private createMessageItem(event: EventType, message: any) {
    return {
      event,
      message,
    };
  }


  private dispatch(event: EventType, message: any) {
    const handlers = this.handlers.get(event);
    if (handlers) {
      handlers.forEach(handler => handler(message))
    }
  }
}

export const Client = WebsocketClient.getInstance();

export const registerEventHandler = (event: EventType, callback: WSMessageHandler) => {
  Client.registerHandler(event, callback);
}

