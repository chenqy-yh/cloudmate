
type WSMessageHandler = (...args) => unknown;

type EventType = 'send_message' | 'message'

type MessageType = 'text' | 'image' | 'notification'

type NotifyType = 'approval:init' | 'approval:next' | 'approval:done' | 'meeting:create'

type QueryOptions = {
  direction: 'forward' | 'backward';
  after_msg_id?: string;
  before_msg_id?: string;
  date?: {
    year: number;
    month: number;
    day: number;
  };
  limit?: number;
  page?: number;
}

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
  _id: string;
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
