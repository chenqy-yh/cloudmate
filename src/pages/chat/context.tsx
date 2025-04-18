import React from "react"

type ChatContextType = {
  setShowDrawer: React.Dispatch<React.SetStateAction<boolean>>
}

export const ChatContext = React.createContext<ChatContextType>({
  setShowDrawer: () => {},
})
