import List from "@/components/list"
import CommonLayout from "@/layout/common"
import { useContext, useState } from "react"
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
  const { addHistory, setActiveView } = useContext(ChatSettingContext)

  const navigateToFindChatRecordDetail = (view: SettingViews) => {
    addHistory(SettingViews.FIND_CHAT_RECORD)
    setActiveView(view)
  }

  return (
    <div className={styles.search_page}>
      <div className={styles.filters}>
        <div className={styles.filters__title}>按分类查找</div>
        <div className={styles.filters__options}>
          <div className={styles.filters__option} onClick={() => navigateToFindChatRecordDetail(SettingViews.FIND_CHAT_RECORD_DATE)}>
            日期
          </div>
          <div className={styles.filters__option} onClick={() => navigateToFindChatRecordDetail(SettingViews.FIND_CHAT_RECORD_KEYWORD)}>
            关键字
          </div>
        </div>
      </div>
    </div>
  )
}

const MainView = () => {
  const { setActiveView, addHistory } = useContext(ChatSettingContext)
  const {} = useContext(ChatContext)

  const navigateToFindChatRecord = () => {
    addHistory(SettingViews.MAIN)
    setActiveView(SettingViews.FIND_CHAT_RECORD)
  }

  return (
    <List className={styles.list}>
      <List.ListItem title="查找聊天记录" extraText="关键字,日期" onClick={navigateToFindChatRecord} />
    </List>
  )
}

const ChatSetting = () => {
  const { setShowDrawer } = useContext(ChatContext)
  const [active_view, setActiveView] = useState(SettingViews.MAIN)
  const [history, setHistory] = useState<SettingViews[]>([])

  const handleBack = () => {
    if (history.length > 0) {
      const back_view = history.pop()
      setActiveView(back_view!)
    } else {
      setShowDrawer(false)
    }
  }

  const addHistory = (setting_view: SettingViews) => {
    setHistory((prev) => {
      const new_history = [...prev]
      new_history.push(setting_view)
      return new_history
    })
  }

  const renderActiveView = () => {
    switch (active_view) {
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
        setActiveView,
        addHistory,
      }}
    >
      <CommonLayout title={active_view} back onBack={handleBack}>
        {renderActiveView()}
      </CommonLayout>
    </ChatSettingContext.Provider>
  )
}

export default ChatSetting
