import { createContext } from "react"

type MessageItemContextType = {
  onMessageLoad: () => void
}

export const MessageItemContext = createContext<MessageItemContextType>({
  onMessageLoad: () => {},
})
