import Avatar from "@/components/avatar"
import Icon from "@/components/icon"
import SearchBar from "@/components/search"
import { useDebounce } from "@/hooks/useDebounce"
import { ChatContext } from "@/pages/chat/context"
import { genMsgId } from "@/pages/chat/utils"
import { contacts_selector, selectContactHistory, selectCurrentContact } from "@/store/selectors/contacts"
import { userInfoSelector } from "@/store/selectors/user"
import { getFormattedDate } from "@/utils/date"
import { useContext, useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import styles from "./index.module.scss"

const FindChatRecordByKeywords = () => {
  const { setFocusMsgId, setShowDrawer } = useContext(ChatContext)

  const navigate = useNavigate()

  const receiver_info = useSelector(selectCurrentContact)!
  const self_user_info = useSelector(userInfoSelector)!
  const contacts = useSelector(contacts_selector)
  const messages = useSelector(selectContactHistory(receiver_info.uuid))

  const [keywords, setKeywords] = useState("")
  const [search_messages, setSearchMessages] = useState<PrivateMessageItem[]>([])

  const debounced_keywords = useDebounce(keywords, 300)

  useEffect(() => {
    if (!debounced_keywords) {
      return setSearchMessages([])
    }
    const search_messages = messages.filter((msg) => {
      return msg.type === "text" && msg.content.text!.includes(debounced_keywords)
    })
    setSearchMessages(search_messages)
  }, [debounced_keywords, messages])

  const handleFindChatHistoryByKeywords = (tar_msg: PrivateMessageItem) => {
    // 在messages中查询日期最早大于timestamp的消息
    const tar_msg_index = messages.findIndex((msg) => {
      return msg.timestamp === tar_msg.timestamp
    })

    console.log("tar_msg_index", tar_msg_index, messages)
    if (tar_msg_index !== -1) {
      navigate("/chat")
      setShowDrawer(false)
      setFocusMsgId(genMsgId(tar_msg_index))
    }
  }

  const renderSearchMessages = () => {
    return (
      <div className={styles.msg_list}>
        {search_messages.map((msg, index) => {
          const uuid = msg.sender
          const msg_user_info = uuid === self_user_info.uuid ? self_user_info : contacts.find((contact) => contact.uuid === uuid)
          const msg_user_name = msg_user_info?.name || "未知"
          const msg_user_avatar = msg_user_info?.avatar || ""

          return (
            <div key={index} className={styles.message_item} onClick={() => handleFindChatHistoryByKeywords(msg)}>
              <Avatar className={styles.avatar} username={msg_user_name} src={msg_user_avatar} />
              <div className={styles.msg_info}>
                <div className={styles.username}>{msg_user_name}</div>
                <div className={styles.msg_timestamp}>{getFormattedDate(msg.timestamp, "YYYY年MM月DD日")}</div>
              </div>
              <div className={styles.msg_content}>{msg.content.text}</div>
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <div className={styles.keywords_body}>
      <div className={styles.search_bar}>
        <SearchBar value={keywords} onInput={(e) => setKeywords(e.detail.value)} />
      </div>
      {search_messages.length === 0 ? (
        <div className={styles.empty}>
          <Icon icon="empty" size={100} />
        </div>
      ) : (
        renderSearchMessages()
      )}
    </div>
  )
}

export default FindChatRecordByKeywords
