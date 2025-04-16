import { createContext } from "react";

type ChatSettingContextType = {
  setActiveSettingView: React.Dispatch<React.SetStateAction<string>>;
}

export const ChatSettingContext = createContext<ChatSettingContextType>({
  setActiveSettingView: () => { },
})
