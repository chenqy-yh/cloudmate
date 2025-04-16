import { uploadImage } from "@/apis/chat"
import Icon from "@/components/icon"
import { Client } from "@/socket"
import { withProtocol } from "@/utils/common"
import { CommonEventFunction, Input, InputProps, TextareaProps } from "@tarojs/components"
import Taro from "@tarojs/taro"
import { useCallback, useContext, useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { ChatContext } from "../../context"
import { createPrivateMessageItem } from "../../utils"
import styles from "./index.module.scss"

const ChatComposer = () => {
  const [inputVal, setInputVal] = useState("")
  const [showActions, setShowActions] = useState(false)
  const [bottom, setBottom] = useState(20)
  const inputRef = useRef<InputProps>()

  const { receiver_info, sender_info, setMessages, scrollMsgListToBottom } = useContext(ChatContext)

  useEffect(() => {
    const handleKeyboardChange = (res) => setBottom(res.height)
    Taro.onKeyboardHeightChange(handleKeyboardChange)
    return () => Taro.offKeyboardHeightChange(handleKeyboardChange)
  }, [])

  const handleInput: CommonEventFunction<TextareaProps.onInputEventDetail> = useCallback((e) => setInputVal(e.detail.value), [])

  const sendMessage = useCallback(
    (type: MessageType, content: any) => {
      Client.sendPrivateMessage({
        sender: sender_info.uuid,
        receiver: receiver_info.uuid,
        type,
        content,
        callback: () => {
          setMessages((prev) => [...prev, createPrivateMessageItem(sender_info.uuid, receiver_info.uuid, content, type)])
          scrollMsgListToBottom()
        },
      })
    },
    [receiver_info.uuid, scrollMsgListToBottom, sender_info.uuid, setMessages]
  )

  const handleSendMessage = useCallback(() => {
    if (!inputVal.trim()) return
    sendMessage("text", { text: inputVal })
    setInputVal("")
  }, [inputVal, sendMessage])

  return (
    <div className={styles.chat_composer} style={{ bottom: `${bottom}px` }}>
      {!showActions ? (
        <>
          <Input ref={inputRef} className={styles.inner_input} value={inputVal} onInput={handleInput} adjustPosition={false} />
          {inputVal.trim() && (
            <div className={styles.send_button} onClick={handleSendMessage}>
              发送
            </div>
          )}
        </>
      ) : (
        <ChatActions sendMessage={sendMessage} />
      )}
      <Icon icon="add-black" onClick={() => setShowActions((prev) => !prev)} size={30} />
    </div>
  )
}

const ChatActions = ({ sendMessage }: { sendMessage: (type: "text" | "image", content: any) => void }) => {
  const handleImageUpload = useCallback(async () => {
    const res = await Taro.chooseImage({ count: 1 })
    const localUrl = res.tempFilePaths[0]
    const { Location } = await uploadImage(localUrl)
    const remoteUrl = withProtocol(Location)
    sendMessage("image", { image: remoteUrl })
  }, [sendMessage])

  const actions = [
    {
      label: "审批",
      handler: () =>
        Taro.navigateTo({
          url: "/pages/approval/index",
        }),
    },
    {
      label: "日程",
      handler: () => Taro.showToast({ title: "功能开发中", icon: "none" }),
    },
    {
      label: "图片",
      handler: handleImageUpload,
    },
    {
      label: "文件",
      handler: () => Taro.showToast({ title: "功能开发中", icon: "none" }),
    },
  ]

  return (
    <div className={styles.chat_actions}>
      {actions.map(({ label, handler }) => (
        <div key={label} className={styles.action_item} onClick={() => handler?.()}>
          {label}
        </div>
      ))}
    </div>
  )
}

export default ChatComposer
