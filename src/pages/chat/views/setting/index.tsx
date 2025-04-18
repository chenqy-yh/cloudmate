import List from "@/components/list"
import CommonLayout from "@/layout/common"
import { useContext, useEffect, useState } from "react"
import { Route, Routes, useLocation, useNavigate } from "react-router-dom"
import { ChatContext } from "../../context"
import FindChatRecordByDate from "./components/chat-record/date"
import FindChatRecordByKeywords from "./components/chat-record/keywords"
import { ChatSettingContext } from "./context"
import styles from "./index.module.scss"

export const enum SettingViews {
  MAIN = "聊天设置",
  FIND_CHAT_RECORD = "查找聊天记录",
  FIND_CHAT_RECORD_DATE = "日期查找",
  FIND_CHAT_RECORD_KEYWORD = "关键字查找",
}

const FindChatRecord = () => {
  const { setTitle } = useContext(ChatSettingContext)
  const navigate = useNavigate()

  useEffect(() => {
    setTitle(SettingViews.FIND_CHAT_RECORD)
  }, [setTitle])

  const navigateToFindChatRecordDetail = (sub: string) => {
    navigate(`/chat/setting/find-chat-record/${sub}`)
  }

  return (
    <div className={styles.search_page}>
      <div className={styles.filters}>
        <div className={styles.filters__title}>按分类查找</div>
        <div className={styles.filters__options}>
          <div className={styles.filters__option} onClick={() => navigateToFindChatRecordDetail("date")}>
            日期
          </div>
          <div className={styles.filters__option} onClick={() => navigateToFindChatRecordDetail("keywords")}>
            关键字
          </div>
        </div>
      </div>
    </div>
  )
}

const MainView = () => {
  const { setTitle } = useContext(ChatSettingContext)
  const navigate = useNavigate()

  useEffect(() => {
    setTitle(SettingViews.MAIN)
  }, [setTitle])

  const navigateToFindChatRecord = () => {
    navigate("/chat/setting/find-chat-record")
  }

  return (
    <List className={styles.list}>
      <List.ListItem title="查找聊天记录" extraText="关键字,日期" onClick={navigateToFindChatRecord} />
    </List>
  )
}

const ChatSetting = () => {
  const { setShowDrawer } = useContext(ChatContext)
  const [title, setTitle] = useState(SettingViews.MAIN)
  const navigate = useNavigate()
  const location = useLocation()

  const handleBack = () => {
    const { pathname } = location
    navigate(-1)
    if (pathname === "/chat/setting") {
      setShowDrawer(false)
    }
  }

  return (
    <ChatSettingContext.Provider
      value={{
        setTitle,
      }}
    >
      <CommonLayout title={title} back onBack={handleBack}>
        <Routes>
          <Route path="/setting" element={<MainView />} />
          <Route path="/setting/find-chat-record" element={<FindChatRecord />} />
          <Route path="/setting/find-chat-record/date" element={<FindChatRecordByDate />} />
          <Route path="/setting/find-chat-record/keywords" element={<FindChatRecordByKeywords />} />
        </Routes>
      </CommonLayout>
    </ChatSettingContext.Provider>
  )
}

export default ChatSetting
