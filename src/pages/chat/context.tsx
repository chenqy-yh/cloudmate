import React from "react"

type ChatContextType = {
  setShowDrawer: React.Dispatch<React.SetStateAction<boolean>>
  focus_msg_id: string
  setFocusMsgId: React.Dispatch<React.SetStateAction<string>>
}

export const ChatContext = React.createContext<ChatContextType>({
  setShowDrawer: () => {},
  focus_msg_id: "",
  setFocusMsgId: () => {},
})
