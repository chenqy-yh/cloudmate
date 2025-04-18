import Drawer from "@/components/drawer"
import Loader from "@/components/loading/icon"
import { contacts_selector, selectCurrentContact } from "@/store/selectors/contacts"
import { userInfoSelector } from "@/store/selectors/user"
import { Block } from "@tarojs/components"
import { useState } from "react"
import { useSelector } from "react-redux"
import { ChatContext } from "./context"
import MainContent from "./views/main-content"
import ChatSetting from "./views/setting"

const ChatPage = () => {
  const contacts = useSelector(contacts_selector)
  const sender_info = useSelector(userInfoSelector)!
  const receiver_info = useSelector(selectCurrentContact)!

  const [show_drawer, setShowDrawer] = useState(false)
  const [focus_msg_id, setFocusMsgId] = useState("")

  if (!contacts || contacts.length === 0 || !sender_info || !receiver_info) {
    return <Loader />
  }

  return (
    <ChatContext.Provider
      value={{
        setShowDrawer,
        focus_msg_id,
        setFocusMsgId,
      }}
    >
      <MainContent />
      <Block>
        <Drawer isOpened={show_drawer} onClose={() => setShowDrawer(false)} placement="right" width="100vw">
          <ChatSetting />
        </Drawer>
      </Block>
    </ChatContext.Provider>
  )
}

export default ChatPage
