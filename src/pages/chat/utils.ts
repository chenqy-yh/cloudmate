
export const createPrivateMessageItem =
  (sender: string, receiver: string, content: MessageContentMap, type: MessageType) => {
    return {
      type,
      content,
      from_me: true,
      read: false,
      sender,
      receiver,
      timestamp: new Date().toISOString(),
      topic: `chat:private:${sender}:${receiver}`,
    } as PrivateMessageItem;
  }

export const genMsgId = (index: number) => `msg_${index}`; // 生成消息的id
