
type WSMessageHandler = (...args) => unknown;

type EventType = 'SendPrivateMessage' | 'GetPrivateMessages'

type MessageType = 'text' | 'image' | 'notification'

type NotifyType = 'approval:init' | 'approval:next' | 'approval:done'

type MessageContentMap = {
  text?: string;
  image?: string;
  notification?: {
    type: NotifyType;
    payload: any; // 根据type 进行不同的处理
  }
}


type MessagePayload<T extends MessageType = MessageType> = {
  type: T;
  sender: string;
  receiver: string;
  content: MessageContentMap;
}

type PrivateMessageItem<T extends MessageType = MessageType> = {
  type: T;
  content: MessageContentMap;
  from_me: boolean;
  read: boolean;
  receiver: string;
  sender: string;
  timestamp: string;
  topic: string;
}


type WSMessageItem = {
  event: EventType;
  message: any;
}
