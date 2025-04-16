import List from "@/components/list"
import CommonLayout from "@/layout/common"
import { useContext, useState } from "react"
import { ChatContext } from "../../context"
import FindChatRecordByDate from "./components/chat-record/date"
import FindChatRecordByKeywords from "./components/chat-record/keywords"
import { ChatSettingContext } from "./context"
import styles from "./index.module.scss"

const enum SettingViews {
  MAIN = "聊天设置",
  FIND_CHAT_RECORD = "查找聊天记录",
  FIND_CHAT_RECORD_DATE = "日期查找",
  FIND_CHAT_RECORD_KEYWORD = "关键字查找",
}

const FindChatRecord = () => {
  const { setActiveSettingView } = useContext(ChatSettingContext)

  const handleAcitveSettingView = (view: SettingViews) => {
    setActiveSettingView(view)
  }

  return (
    <div className={styles.search_page}>
      <div className={styles.filters}>
        <div className={styles.filters__title}>按分类查找</div>
        <div className={styles.filters__options}>
          <div className={styles.filters__option} onClick={() => handleAcitveSettingView(SettingViews.FIND_CHAT_RECORD_DATE)}>
            日期
          </div>
          <div className={styles.filters__option} onClick={() => handleAcitveSettingView(SettingViews.FIND_CHAT_RECORD_KEYWORD)}>
            关键字
          </div>
        </div>
      </div>
    </div>
  )
}

const MainView = () => {
  const { setActiveSettingView } = useContext(ChatSettingContext)

  const handleFindChatRecord = () => {
    setActiveSettingView(SettingViews.FIND_CHAT_RECORD)
  }

  return (
    <List className={styles.list}>
      <List.ListItem title="查找聊天记录" extraText="关键字,日期" onClick={handleFindChatRecord} />
    </List>
  )
}

const ChatSetting = () => {
  const { setShowDrawer } = useContext(ChatContext)
  const [active_setting_view, setActiveSettingView] = useState(SettingViews.MAIN)

  const renderContent = () => {
    switch (active_setting_view) {
      case SettingViews.FIND_CHAT_RECORD:
        return <FindChatRecord />
      case SettingViews.FIND_CHAT_RECORD_DATE:
        return <FindChatRecordByDate />
      case SettingViews.FIND_CHAT_RECORD_KEYWORD:
        return <FindChatRecordByKeywords />
      case SettingViews.MAIN:
      default:
        return <MainView />
    }
  }

  return (
    <ChatSettingContext.Provider
      value={{
        setActiveSettingView,
      }}
    >
      <CommonLayout title={active_setting_view} back onBack={() => setShowDrawer(false)}>
        {renderContent()}
      </CommonLayout>
    </ChatSettingContext.Provider>
  )
}

export default ChatSetting
