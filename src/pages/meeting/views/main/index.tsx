import { getMeetingList } from "@/apis/schedule"
import { MeetingLevel, meeting_level_to_en } from "@/constants/meeting"
import CommonLayout from "@/layout/common"
import { DayInfo, MonthInfo, getAmPm, getFormattedDate, getMonthInfo } from "@/utils/date"
import { Swiper, SwiperItem } from "@tarojs/components"
import classNames from "classnames"
import { useEffect, useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import styles from "./index.module.scss"

const OFFSET = 3

type Time = {
  year: number
  month: number
  day: number
}

type DayInfoWithMeeting = DayInfo & { max_level?: MeetingLevel }

type MonthInfoWithMeeting = {
  [K in keyof MonthInfo]: K extends "days" ? DayInfoWithMeeting[] : MonthInfo[K]
}

type WeekDaySwitchProps = {
  time: Time
  meeting_list: MeetingEntity[]
  onChange: (time: Time) => void
}
const week_cn = ["日", "一", "二", "三", "四", "五", "六"]

const CreateMeetingButton = () => {
  const navigate = useNavigate()

  return <div className={styles.create_btn} onClick={() => navigate("/Meeting/create")} />
}

const WeekDaySwitch: React.FC<WeekDaySwitchProps> = (props) => {
  const { time, meeting_list, onChange } = props
  const { month_info } = useMemo(() => {
    const month_info: MonthInfoWithMeeting = getMonthInfo({ year: time.year, month: time.month, pre: false, after: false })
    meeting_list.forEach((meeting) => {
      const day = new Date(meeting.start_time).getDate()
      const level = meeting.level
      month_info.days[day - 1].max_level = Math.max(month_info.days[day - 1].max_level ?? MeetingLevel.LOW, level)
    })
    return {
      month_info,
    }
  }, [meeting_list, time.month, time.year])

  const active_index = time.day - 1

  const handleChange = (e) => {
    const index = e.detail.current + OFFSET
    onChange({
      ...time,
      day: month_info.days[index].day,
    })
  }

  const handleClickSwiperItem = (index: number) => {
    onChange({
      ...time,
      day: month_info.days[index].day,
    })
  }

  return (
    <Swiper className={styles.weekday_switch} displayMultipleItems={1 + OFFSET * 2} onChange={handleChange} circular current={active_index - OFFSET}>
      {month_info.days.map((day_info, index) => {
        return (
          <SwiperItem
            key={index}
            className={classNames(styles.weekday, {
              [styles.active]: active_index === index,
            })}
            onClick={() => handleClickSwiperItem(index)}
          >
            <div>{week_cn[day_info.week || 0]}</div>
            <div>{day_info.day}</div>
            {day_info.max_level && (
              <div
                className={classNames(styles.level_dot, {
                  [styles[meeting_level_to_en[day_info.max_level]]]: true,
                })}
              />
            )}
          </SwiperItem>
        )
      })}
    </Swiper>
  )
}

const MeetingMainPage = () => {
  const navigate = useNavigate()

  const [time, setTime] = useState<Time>({
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    day: new Date().getDate(),
  })
  const [meeting_list, setMeetingList] = useState<MeetingEntity[]>([])

  useEffect(() => {
    const fetchMeetingList = async () => {
      const list = await getMeetingList(time.year, time.month)
      setMeetingList(list)
    }
    fetchMeetingList()
  }, [time.year, time.month])

  const getDisplayMeetingList = () => {
    const displayMeetingList = meeting_list
      .filter((meeting) => {
        const start_time = new Date(meeting.start_time)
        return start_time.getDate() >= time.day
      })
      .sort((a, b) => {
        return new Date(a.start_time).getTime() - new Date(b.start_time).getTime()
      })

    return displayMeetingList
  }

  const handleSwitchTime = (new_time: Time) => {
    setTime(new_time)
  }

  const navigateToDetail = (mid: string) => {
    navigate(`/meeting/detail?mid=${mid}`)
  }

  return (
    <CommonLayout
      title="日程"
      back
      onBack={() => navigate(-1)}
      attachment={<WeekDaySwitch time={time} meeting_list={meeting_list} onChange={handleSwitchTime} />}
    >
      <div className={styles.body}>
        <div className={styles.meeting_list}>
          {getDisplayMeetingList().map((meeting, index) => {
            return (
              <div key={index} className={styles.meeting} onClick={() => navigateToDetail(meeting.id)}>
                <div className={styles.time}>
                  <div
                    className={classNames(styles.level, {
                      [styles[meeting_level_to_en[meeting.level]]]: true,
                    })}
                  />
                  <div className={styles.date}>{new Date(meeting.start_time).getDate()}日</div>
                  <div className={styles.week_month}>
                    <div className={styles.week}>周{week_cn[new Date(meeting.start_time).getDay()]}</div>
                    <div className={styles.month}>{new Date(meeting.start_time).getMonth() + 1}月</div>
                  </div>
                </div>
                <div className={styles.meeting_detail}>
                  <div className={styles.title}>{`${meeting.creator?.name}主持的会议:${meeting.title}`}</div>
                  <div className={styles.duration}>
                    {getAmPm(meeting.start_time, { am: "上午", pm: "下午" }) +
                      getFormattedDate(meeting.start_time, "HH:mm") +
                      " ~ " +
                      getAmPm(meeting.end_time, { am: "上午", pm: "下午" }) +
                      getFormattedDate(meeting.end_time, "HH:mm")}
                  </div>
                </div>
                <div className={styles.meeting_desc}>{meeting.desc}</div>
              </div>
            )
          })}
        </div>
        <CreateMeetingButton />
      </div>
    </CommonLayout>
  )
}

export default MeetingMainPage
