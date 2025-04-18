import { useContext, useEffect } from "react"
import { SettingViews } from "../../.."
import { ChatSettingContext } from "../../../context"

const FindChatRecordByKeywords = () => {
  const { setTitle } = useContext(ChatSettingContext)

  useEffect(() => {
    setTitle(SettingViews.FIND_CHAT_RECORD_KEYWORD)
  }, [setTitle])
  return (
    <div>
      <h1>FindChatRecordByKeywords</h1>
    </div>
  )
}

export default FindChatRecordByKeywords
