import Header from "@/components/header"
import Icon from "@/components/icon"
import { getFormattedDate } from "@/utils/date"
import { ScrollView } from "@tarojs/components"
import classNames from "classnames"
import React, { useContext } from "react"
import { useNavigate } from "react-router-dom"
import ChatComposer from "../../components/chat-composer"
import MessageItem from "../../components/message-item"
import { ChatContext } from "../../context"
import styles from "./index.module.scss"

type MessageListProps = {
  messages: PrivateMessageItem[]
  sender: UserInfo
  receiver: UserInfo
}

const genMsgId = (index: number) => `msg_${index}`

// 根据 timestamp  2025-04-13T13:00:26.531+00:00 获取 时间戳
const getTimestamp = (timestamp: string) => {
  const date = new Date(timestamp)
  return date.getTime()
}

const DIFF_TIME = 5 * 60 * 1000 // 5分钟
const DATE_FORMAT = "MM-DD HH:mm:ss"

const MessageList: React.FC<MessageListProps> = (props) => {
  const { messages, sender, receiver } = props
  return messages.map((msg, index) => {
    const pre_msg_ct = getTimestamp(messages[index - 1]?.timestamp) || 0
    const cur_msg_ct = getTimestamp(msg.timestamp)
    const diff = cur_msg_ct - pre_msg_ct
    return (
      <>
        {diff > DIFF_TIME && (
          <div key={`divider_${index}`} className={styles.msg_item_time}>
            {getFormattedDate(msg.timestamp, DATE_FORMAT)}
          </div>
        )}
        <div
          id={genMsgId(index)}
          key={index}
          className={classNames(styles.msg_item_wrapper, {
            [styles[msg.from_me ? "sender" : "receiver"]]: true,
          })}
        >
          <MessageItem from_me={msg.from_me} type={msg.type} content={msg.content} user_info={msg.from_me ? sender : receiver} />
        </div>
      </>
    )
  })
}

const MainContent = () => {
  const { messages, receiver_info, scroll_anim, scroll_into_view, sender_info, setShowDrawer } = useContext(ChatContext)

  const navigate = useNavigate()

  const handleBack = () => {
    navigate(-1)
  }

  const handleOpenSetting = () => {
    setShowDrawer(true)
  }

  return (
    <div className={styles.chat_page}>
      <Header>
        <div className={styles.chat_header}>
          <Icon icon="back" size={30} onClick={handleBack} />
          <Icon icon="more-2" size={30} onClick={handleOpenSetting} />

          <div className={styles.chat_header_title}>{receiver_info.name}</div>
        </div>
      </Header>
      <div className={styles.chat_content}>
        <ScrollView
          scrollY
          scrollWithAnimation={scroll_anim}
          scrollIntoViewWithinExtent
          scrollAnimationDuration="300"
          scrollIntoView={scroll_into_view}
          className={styles.msg_list}
        >
          <MessageList messages={messages} receiver={receiver_info} sender={sender_info} />
        </ScrollView>
        <ChatComposer />
      </div>
    </div>
  )
}

export default MainContent
