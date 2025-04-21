import { getMeetingDetail } from "@/apis/schedule"
import Avatar from "@/components/avatar"
import LoadingBox from "@/components/loading/box"
import { meeting_level_to_cn } from "@/constants/meeting"
import CommonLayout from "@/layout/common"
import { getFormattedDate } from "@/utils/date"
import React, { useEffect, useMemo, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import styles from "./index.module.scss"

type MeetingDetailItemProps = {
  title: string
  children: React.ReactNode
}

const MeetingDetailItem: React.FC<MeetingDetailItemProps> = ({ title, children }) => (
  <div className={styles.item}>
    <div className={styles.item_title}>{title}</div>
    <div className={styles.item_value}>{children}</div>
  </div>
)

const MeetingDetail: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const [meeting, setMeeting] = useState<MeetingEntity>()
  const [load, setIsLoad] = useState(true)

  const { mid } = useMemo(() => {
    const search = location.search
    const mid = new URLSearchParams(search).get("mid")
    return {
      mid,
    }
  }, [location.search])

  useEffect(() => {
    const fetchMeetingDetail = async () => {
      if (!mid) return
      setIsLoad(true)
      const fetch_detail = await getMeetingDetail(mid)
      console.log(fetch_detail)
      setMeeting(fetch_detail)
      setIsLoad(false)
    }
    fetchMeetingDetail()
  }, [mid])

  return (
    <CommonLayout title={{ placement: "center", content: "会议详情" }} back onBack={() => navigate(-1)}>
      <LoadingBox load={load} className={styles.body}>
        <div className={styles.item_list}>
          <MeetingDetailItem title="会议主题">{meeting?.title}</MeetingDetailItem>
          <MeetingDetailItem title="等级">{meeting_level_to_cn[meeting?.level ?? 1]}</MeetingDetailItem>
          <MeetingDetailItem title="创建人">{meeting?.creator?.name}</MeetingDetailItem>
          <MeetingDetailItem title="会议描述">{meeting?.desc}</MeetingDetailItem>
          {meeting?.start_time && <MeetingDetailItem title="开始时间">{getFormattedDate(meeting?.start_time!)}</MeetingDetailItem>}
          {meeting?.end_time && <MeetingDetailItem title="结束时间">{getFormattedDate(meeting?.end_time!)}</MeetingDetailItem>}
          {meeting?.location && <MeetingDetailItem title="会议地点">{meeting?.location}</MeetingDetailItem>}
          {meeting?.url && <MeetingDetailItem title="腾讯会议链接">{meeting?.url}</MeetingDetailItem>}
          {meeting?.creator && meeting?.participants && (
            <MeetingDetailItem title="参会人员">
              <div className={styles.row}>
                {[meeting?.creator, ...(meeting?.participants ?? [])].map((part) => {
                  return (
                    <div key={part.uuid} className={styles.part_info}>
                      <Avatar username={part.name} src={part.avatar} />
                      <span className={styles.participant}>{part.name}</span>
                    </div>
                  )
                })}
              </div>
            </MeetingDetailItem>
          )}
        </div>
      </LoadingBox>
    </CommonLayout>
  )
}

export default MeetingDetail
