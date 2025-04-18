import { createContext } from "react"
import { SettingViews } from "."

type ChatSettingContextType = {
  setActiveView: React.Dispatch<React.SetStateAction<string>>
  addHistory: (view: SettingViews) => void
}

export const ChatSettingContext = createContext<ChatSettingContextType>({
  setActiveView: () => {},
  addHistory: () => {},
})
