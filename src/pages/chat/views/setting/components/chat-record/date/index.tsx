import { getPrivateContactTimeRange } from "@/apis/contacts"
import { ChatContext } from "@/pages/chat/context"
import { genMsgId } from "@/pages/chat/utils"
import { selectContactHistory, selectCurrentContact } from "@/store/selectors/contacts"
import { DayInfo, MonthInfo, getMonthInfo } from "@/utils/date"
import classNames from "classnames"
import { useContext, useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { SettingViews } from "../../.."
import styles from "./index.module.scss"

type Year = number
type Month = number
type Day = number
type TimestampRecord = Record<Year, Record<Month, Array<Day>>>

const weeks = ["日", "一", "二", "三", "四", "五", "六"]

const isCurrentMonth = (month_info: MonthInfo, day: DayInfo) => {
  const { year, month } = month_info
  const { year: day_year, month: day_month } = day
  return year === day_year && month === day_month
}

const getMonthInfoList = (options: { st: { year: number; month: number }; ed: { year: number; month: number } }) => {
  const { st, ed } = options
  const month_info_list: MonthInfo[] = []
  const { year: start_year, month: start_month } = st
  const { year: end_year, month: end_month } = ed

  for (let y = start_year; y <= end_year; y++) {
    const start_m = y === start_year ? start_month : 1
    const end_m = y === end_year ? end_month : 12
    for (let m = start_m; m <= end_m; m++) {
      month_info_list.push(getMonthInfo({ year: y, month: m }))
    }
  }
  return month_info_list
}

const FindChatRecordByDate = () => {
  const { setFocusMsgId, setShowDrawer } = useContext(ChatContext)

  const navigate = useNavigate()

  const receiver_info = useSelector(selectCurrentContact)!
  const [month_info_list, setMonthInfoList] = useState<MonthInfo[]>([])
  const [timestamp_record, setTimestampRecord] = useState<TimestampRecord>({})
  const messages = useSelector(selectContactHistory(receiver_info.uuid))

  const hasRecord = (day: DayInfo) => {
    const { year, month } = day
    if (timestamp_record[year] === undefined) {
      return false
    }
    if (timestamp_record[year][month] === undefined) {
      return false
    }
    return timestamp_record[year][month].includes(day.day)
  }

  const isToday = (day: DayInfo) => {
    const today = new Date()
    return day.year === today.getFullYear() && day.month === today.getMonth() + 1 && day.day === today.getDate()
  }

  // 获取时间范围
  useEffect(() => {
    const fetchTimeRange = async () => {
      const timestamp_list = await getPrivateContactTimeRange(receiver_info.uuid)
      const y_m_record_set = new Set<string>()
      const timestamp_record: TimestampRecord = {}
      for (const tp of timestamp_list) {
        const [y, m, d] = tp._id.split("-")
        const year = Number(y)
        const month = Number(m)
        const day = Number(d)
        if (timestamp_record[year] === undefined) {
          timestamp_record[year] = {}
        }
        if (timestamp_record[year][month] === undefined) {
          timestamp_record[year][month] = []
        }
        timestamp_record[year][month].push(day)
        y_m_record_set.add(`${year}-${month}`)
      }
      const _y_m_reocord = Array.from(y_m_record_set).sort((a, b) => {
        const [y1, m1] = a.split("-")
        const [y2, m2] = b.split("-")
        if (y1 === y2) {
          return Number(m1) - Number(m2)
        }
        return Number(y1) - Number(y2)
      })
      const max_y_m = _y_m_reocord[_y_m_reocord.length - 1].split("-")
      const min_y_m = _y_m_reocord[0].split("-")
      const st = { year: Number(min_y_m[0]), month: Number(min_y_m[1]) }
      const ed = { year: Number(max_y_m[0]), month: Number(max_y_m[1]) }
      const month_info_list: MonthInfo[] = getMonthInfoList({ st, ed })
      setMonthInfoList(month_info_list)
      setTimestampRecord(timestamp_record)
    }
    fetchTimeRange()
  }, [receiver_info.uuid])

  const handleFindChatHistoryByDate = (day: DayInfo) => {
    const { year, month, day: d } = day
    const timestamp = new Date(year, month - 1, d).getTime()
    // 在messages中查询日期最早大于timestamp的消息
    const tar_msg_index = messages.findIndex((msg) => {
      const msg_timestamp = new Date(msg.timestamp).getTime()
      return msg_timestamp > timestamp
    })

    if (tar_msg_index !== -1) {
      navigate("/chat")
      setShowDrawer(false)
      setFocusMsgId(genMsgId(tar_msg_index))
    }
  }

  return (
    <div className={styles.date_body}>
      <div className={styles.weeks}>
        {weeks.map((w, index) => (
          <div key={index} className={styles.week}>
            {w}
          </div>
        ))}
      </div>
      {month_info_list.map((month_info) => {
        return (
          <div key={`${month_info.year}-${month_info.month}`} className={styles.month_info}>
            <div className={styles.month_title}>
              {month_info.year}年{month_info.month}月
            </div>
            <div className={styles.days}>
              {month_info.days.map((day) => {
                return (
                  <div
                    key={`${day.year}-${day.month}-${day.day}`}
                    className={classNames(styles.day, {
                      [styles.has_record]: hasRecord(day),
                      [styles.today]: isToday(day),
                    })}
                    onClick={() => hasRecord(day) && handleFindChatHistoryByDate(day)}
                  >
                    {isCurrentMonth(month_info, day) ? day.day : ""}
                  </div>
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default FindChatRecordByDate
