import { createMeeting } from "@/apis/schedule"
import IButton from "@/components/button"
import { Day } from "@/components/picker/date"
import { MeetingLevel, meeting_level_to_cn } from "@/constants/meeting"
import CommonLayout from "@/layout/common"
import { createPrivateMessageItem } from "@/pages/chat/utils"
import { addMessageToContactHistory } from "@/store/reducers/contacts"
import { userInfoSelector } from "@/store/selectors/user"
import { error, success } from "@/utils/common"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import Participants from "../../components/participants"
import { Part } from "../../components/participants/components"
import Picker from "../../components/picker/common"
import DatePicker from "../../components/picker/date"
import { dayTransfer } from "../../components/picker/date/utils"
import Text from "../../components/text/input"
import Desc from "../../components/text/textarea"
import styles from "./index.module.scss"
import { validate_schema } from "./validate"

type CreateMeetingDto = {
  meetingName: string
  meetingDesc: string
  level: MeetingLevel | null
  start_time: Date | undefined
  end_time: Date | undefined
  location?: string
  url?: string
  selected_parts: string[]
}

type SelectorItem = {
  label: string
  value: number
}

const meeting_level_selector: SelectorItem[] = Object.keys(meeting_level_to_cn).reduce((acc, cur) => {
  acc.push({
    label: meeting_level_to_cn[cur],
    value: parseInt(cur),
  })
  return acc
}, [] as SelectorItem[])

const MeetingCreatePage = () => {
  const user_info = useSelector(userInfoSelector)!

  const dispatch = useDispatch()

  const navigate = useNavigate()
  const [meetingName, setMeetingName] = useState("")
  const [meetingDesc, setMeetingDesc] = useState("")
  const [start_time, setStartTime] = useState<Day>()
  const [end_time, setEndTime] = useState<Day>()
  const [location, setLocation] = useState<string>("")
  const [level, setLevel] = useState<MeetingLevel | null>(null) // default value
  const [url, setUrl] = useState<string>("")
  const [selected_parts, setSelectedParts] = useState<Part[]>([])

  const notify = (dto: CreateMeetingDto) => {
    const { meetingName, start_time, selected_parts, level } = dto
    for (const part_uuid of selected_parts) {
      dispatch(
        addMessageToContactHistory({
          message: createPrivateMessageItem(
            user_info.uuid,
            part_uuid,
            {
              notification: {
                type: "meeting:create",
                payload: {
                  title: meetingName,
                  creator: {
                    uuid: user_info.uuid,
                    name: user_info.name,
                    avatar: user_info.avatar,
                  },
                  start_time: start_time?.toISOString(),
                  level: level,
                },
              },
            },
            "notification"
          ),
          contact_uuid: part_uuid,
        })
      )
    }
  }

  const onSubmit = async () => {
    const dto: CreateMeetingDto = {
      meetingName,
      meetingDesc,
      level,
      start_time: dayTransfer(start_time!),
      end_time: dayTransfer(end_time!),
      location: location ? location : undefined,
      url: url ? url : undefined,
      selected_parts: selected_parts.map((part) => part.uuid),
    }

    try {
      await validate_schema.validate(dto)
      await createMeeting(dto)
      navigate(-1)
      success("创建会议成功")
      notify(dto)
    } catch (err) {
      error(err.errors?.[0])
      console.error(err)
    }
  }

  return (
    <CommonLayout title="创建日程" back onBack={() => navigate(-1)}>
      <div className={styles.body}>
        <div className={styles.form}>
          <Text title="会议名称" value={meetingName} onInput={(e) => setMeetingName(e.detail.value)} important placeholder="请填写会议名称" />
          <Desc title="描述" value={meetingDesc} onInput={(e) => setMeetingDesc(e.detail.value)} important placeholder="请填写会议描述" />
          <Picker title="会议等级" value={level} selector={meeting_level_selector} onChange={(e) => setLevel(e)} placeholder="请选择会议等级" important />
          <DatePicker title="开始时间" value={start_time} important onChange={(e) => setStartTime(e)} placeholder="请选择开始时间" />
          <DatePicker title="结束时间" value={end_time} important onChange={(e) => setEndTime(e)} placeholder="请选择结束时间" />
          <Text title="会议地点" value={location} onInput={(e) => setLocation(e.detail.value)} placeholder="请填写会议地点" />
          <Text title="会议链接" value={url} onInput={(e) => setUrl(e.detail.value)} placeholder="请填写腾讯会议链接" />
          <Participants important onChangeParts={setSelectedParts} selected_parts={selected_parts} />
        </div>
        <IButton type="primary" long onClick={onSubmit}>
          提交
        </IButton>
      </div>
    </CommonLayout>
  )
}

export default MeetingCreatePage
