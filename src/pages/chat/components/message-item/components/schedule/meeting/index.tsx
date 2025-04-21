import IButton from "@/components/button"
import { meeting_level_to_cn } from "@/constants/meeting"
import { error } from "@/utils/common"
import { getFormattedDate } from "@/utils/date"
import { useCallback } from "react"
import styles from "./index.module.scss"

type MeetingCreateMessageProps = {
  title: string
  creator: {
    uuid: string
    name: string
    avatar: string
  }
  start_time: Date
  level: string
}

const MeetingCreateMessage: React.FC<MeetingCreateMessageProps> = (props) => {
  const { title, creator, start_time, level } = props

  const handleNavigateToDetail = useCallback(() => {
    error("暂未实现详情页跳转")
  }, [])

  return (
    <div className={styles.meeting}>
      <div className={styles.title}>{`${creator.name}邀请您加入会议:${title}`}</div>
      <div className={styles.form}>
        <div className={styles.label}>开始时间</div>
        <div className={styles.value}>{getFormattedDate(new Date(start_time), "YYYY年MM月DD日 HH:mm")}</div>
        <div className={styles.label}>会议等级</div>
        <div className={styles.value}>{meeting_level_to_cn[level]}</div>
      </div>
      <IButton type="primary" long onClick={handleNavigateToDetail}>
        查看详情
      </IButton>
    </div>
  )
}

export default MeetingCreateMessage
