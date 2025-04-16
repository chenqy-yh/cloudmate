import Drawer from "@/components/drawer"
import Loader from "@/components/loading/icon"
import { Client, registerPrivateMessasge } from "@/socket"
import { contacts_selector } from "@/store/selectors/contacts"
import { userInfoSelector } from "@/store/selectors/user"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { useSelector } from "react-redux"
import { ChatContext } from "./context"
import MainContent from "./views/main-content"
import ChatSetting from "./views/setting"

const genMsgId = (index: number) => `msg_${index}`

const ChatPage = () => {
  const first_load = useRef(true)

  const contacts = useSelector(contacts_selector)
  const sender_info = useSelector(userInfoSelector)!

  const [show_drawer, setShowDrawer] = useState(false)
  const [messages, setMessages] = useState<PrivateMessageItem[]>([])
  const [scroll_anim, setIsScrollAnim] = useState(false)
  const [scroll_into_view, setScrollIntoView] = useState<string>(genMsgId(messages.length - 1))

  const { receiver_info } = useMemo(() => {
    const params = new URLSearchParams(location.search)
    const receiver_uuid = params.get("receiver_uuid") || ""
    const receiver_info = contacts.find((contact) => contact.uuid === receiver_uuid)!

    return { receiver_info }
  }, [contacts])

  const handleReceiveMessage = useCallback((messages: PrivateMessageItem[]) => {
    setMessages((pre) => [...pre, ...messages])
  }, [])

  // 滚动到最底部
  const scrollMsgListToBottom = useCallback(() => {
    const targetId = genMsgId(messages.length - 1)
    setScrollIntoView(targetId)
    if (first_load.current) {
      first_load.current = false
      setIsScrollAnim(false)
    } else {
      !scroll_anim && setIsScrollAnim(true)
    }
  }, [messages.length, scroll_anim])

  // 注册监听器 获取私聊消息
  useEffect(() => {
    if (!sender_info || !receiver_info) return
    registerPrivateMessasge("GetPrivateMessages", handleReceiveMessage)
    Client.getPrivateMessages({
      sender: sender_info.uuid,
      receiver: receiver_info.uuid,
    })
    return () => {
      Client.unregisterHandler("GetPrivateMessages", handleReceiveMessage)
    }
  }, [sender_info, receiver_info, handleReceiveMessage])

  // 每当消息列表变化时，滚动到最底部
  useEffect(() => {
    if (messages.length > 0) {
      scrollMsgListToBottom()
    }
  }, [messages.length, scrollMsgListToBottom])

  if (!contacts || contacts.length === 0 || !sender_info || !receiver_info) {
    return <Loader />
  }

  return (
    <ChatContext.Provider
      value={{
        sender_info,
        receiver_info,
        messages,
        setMessages,
        scrollMsgListToBottom,
        scroll_into_view,
        scroll_anim,
        setShowDrawer,
      }}
    >
      <MainContent />
      <Drawer isOpened={show_drawer} onClose={() => setShowDrawer(false)} placement="right" width="100vw">
        <ChatSetting />
      </Drawer>
    </ChatContext.Provider>
  )
}

export default ChatPage
