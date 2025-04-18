import { loadHistory } from "@/apis/chat"
import Header from "@/components/header"
import Icon from "@/components/icon"
import Loader from "@/components/loading/icon"
import { useLoadRequest } from "@/hooks/useLoadRequest"
import { RootState } from "@/store"
import { loadContactHistory } from "@/store/reducers/contacts"
import { selectContactHistory, selectCurrentContact, selectHasLoadContactHistory } from "@/store/selectors/contacts"
import { userInfoSelector } from "@/store/selectors/user"
import { getFormattedDate } from "@/utils/date"
import { ScrollView } from "@tarojs/components"
import classNames from "classnames"
import { useContext, useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import ChatComposer from "../../components/chat-composer"
import MessageItem from "../../components/message-item"
import { ChatContext } from "../../context"
import { genMsgId } from "../../utils"
import styles from "./index.module.scss"

// 根据 timestamp  2025-04-13T13:00:26.531+00:00 获取 时间戳
const getTimestamp = (timestamp: string) => {
  const date = new Date(timestamp)
  return date.getTime()
}

const DIFF_TIME = 5 * 60 * 1000 // 5分钟
const DATE_FORMAT = "MM-DD HH:mm:ss"

function MainContent() {
  const { setShowDrawer, focus_msg_id, setFocusMsgId } = useContext(ChatContext)
  const dispatch = useDispatch()
  const sender_info = useSelector(userInfoSelector)!
  const receiver_info = useSelector(selectCurrentContact)!
  const messages = useSelector(selectContactHistory(receiver_info.uuid))
  const has_load_history = useSelector((state: RootState) => selectHasLoadContactHistory(state, receiver_info.uuid))

  const { load, send } = useLoadRequest()

  const navigate = useNavigate()

  const handleBack = () => {
    navigate(-1)
  }

  const handleOpenSetting = () => {
    navigate("/chat/setting")
    setShowDrawer(true)
  }

  // 滚动到最底部
  const scrollMsgListToBottom = () => {
    const targetId = genMsgId(messages.length - 1)
    console.log("scrollMsgListToBottom", targetId)
    setFocusMsgId(targetId)
  }

  useEffect(() => {
    console.log("focus_msg_id change:", focus_msg_id)
  }, [focus_msg_id])

  useEffect(() => {
    if (has_load_history) return
    send({
      requestFn: () =>
        loadHistory({
          receiver: receiver_info.uuid,
          limit: 20,
        }),
      success: (messages) => {
        dispatch(loadContactHistory({ messages, contact_uuid: receiver_info.uuid }))
      },
    })
  }, [])

  // useEffect(() => {
  //   if (messages && messages.length > 0) {
  //     scrollMsgListToBottom()
  //   }
  // }, [messages])

  const renderMessageList = () => {
    if (!Array.isArray(messages)) return null
    return messages.map((msg, index) => {
      const pre_msg_ct = getTimestamp(messages[index - 1]?.timestamp) || 0
      const cur_msg_ct = getTimestamp(msg.timestamp)
      const diff = Math.abs(pre_msg_ct - cur_msg_ct)
      return (
        <>
          {diff > DIFF_TIME && (
            <div key={`divider_${index}`} className={styles.msg_item_time}>
              {getFormattedDate(msg.timestamp, DATE_FORMAT)}
            </div>
          )}
          <div
            key={msg._id}
            id={genMsgId(index)}
            className={classNames(styles.msg_item_wrapper, {
              [styles[msg.from_me ? "sender" : "receiver"]]: true,
            })}
          >
            <MessageItem from_me={msg.from_me} type={msg.type} content={msg.content} user_info={msg.from_me ? sender_info : receiver_info} />
          </div>
        </>
      )
    })
  }

  return (
    <div className={styles.chat_page}>
      <Header>
        <div className={styles.chat_header}>
          <Icon icon="back" size={30} onClick={handleBack} />
          <Icon icon="more-2" size={30} onClick={handleOpenSetting} />
          {load && <Loader version={2} size={30} className={styles.loader} />}
          <div className={styles.chat_header_title}>{receiver_info.name}</div>
        </div>
      </Header>
      <div className={styles.chat_content}>
        <ScrollView scrollY className={styles.msg_list} scrollIntoView={focus_msg_id} scrollWithAnimation scrollAnimationDuration="300">
          {renderMessageList()}
        </ScrollView>
        <ChatComposer />
      </div>
    </div>
  )
}

export default MainContent
