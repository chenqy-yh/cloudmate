import Avatar from "@/components/avatar"
import { error } from "@/utils/common"
import { Image } from "@tarojs/components"
import Taro from "@tarojs/taro"
import classNames from "classnames"
import React, { useEffect, useState } from "react"
import ApprovalDoneMessage from "./components/approval/done"
import ApprovalInitMessage from "./components/approval/init"
import ApprovalNextMessage from "./components/approval/next"
import styles from "./index.module.scss"

type MessageItemProps<T extends MessageType> = {
  from_me: boolean
  type: T
  content: MessageContentMap
  user_info: UserInfo
}

type MessageItemContentProps<T extends MessageType> = {
  type: T
  content: MessageContentMap
}

type NotifyMessage = {
  content: NonNullable<MessageContentMap["notification"]>
}

export const NotifyMessage: React.FC<NotifyMessage> = ({ content }) => {
  const { payload, type } = content

  switch (type) {
    case "approval:init":
      return <ApprovalInitMessage {...payload} />
    case "approval:next":
      return <ApprovalNextMessage {...payload} />
    case "approval:done":
      return <ApprovalDoneMessage {...payload} />
    default:
      return <span>{`不支持的消息类型: ${type}`}</span>
  }
}

function MessageItemContent<T extends MessageType>({ type, content }: MessageItemContentProps<T>) {
  const handlePreviewImage = () => {
    const image_url = content[type]
    if (typeof image_url !== "string") {
      return error("图片无法预览")
    }
    Taro.previewImage({
      urls: [image_url],
    })
  }

  switch (type) {
    case "text":
      return <div className={styles.message_item_content}>{content[type] as string}</div>
    case "image":
      return (
        <Image
          className={classNames(styles.message_item_content, styles.image)}
          src={(content[type] as string) || ""}
          mode="aspectFill"
          onClick={handlePreviewImage}
        />
      )
    case "notification":
      return (
        <div className={styles.message_item_content}>
          <NotifyMessage content={content[type] as any} />
        </div>
      )
    default:
      return <div className={classNames(styles.message_item_content, styles.error)}>{`不支持的消息类型: ${type}`}</div>
  }
}

function MessageItem<T extends MessageType>({ from_me, content, type, user_info }: MessageItemProps<T>) {
  const messageItemClass = classNames(
    "test",
    {
      [styles[from_me ? "sender_message" : "receiver_message"]]: true,
    },
    styles.message_item
  )

  return (
    <div className={messageItemClass}>
      <Avatar username={user_info.name} src={user_info.avatar} size={30} className={styles.message_item_avatar} />
      <MessageItemContent type={type} content={content} />
    </div>
  )
}

export default MessageItem
