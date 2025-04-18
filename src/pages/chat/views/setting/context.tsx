import { createContext } from "react"

type ChatSettingContextType = {
  setTitle: React.Dispatch<React.SetStateAction<string>>
}

export const ChatSettingContext = createContext<ChatSettingContextType>({
  setTitle: () => {},
})
