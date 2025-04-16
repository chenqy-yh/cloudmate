import React from "react"

type ChatContextType = {
  sender_info: UserInfo
  receiver_info: UserInfo
  messages: PrivateMessageItem[]
  setMessages: React.Dispatch<React.SetStateAction<PrivateMessageItem[]>>
  scrollMsgListToBottom: () => void
  scroll_into_view: string
  scroll_anim: boolean
  setShowDrawer: React.Dispatch<React.SetStateAction<boolean>>
}

export const ChatContext = React.createContext<ChatContextType>({
  sender_info: {
    avatar: null,
    email: null,
    name: "",
    phone: "",
    uuid: "",
  },
  receiver_info: {
    uuid: "",
    name: "",
    avatar: "",
    email: null,
    phone: "",
  },
  messages: [],
  setMessages: () => {},
  scrollMsgListToBottom: () => {},
  scroll_into_view: "",
  scroll_anim: false,
  setShowDrawer: () => {},
})
