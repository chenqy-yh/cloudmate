import { getMonthInfo } from "@/utils/date"
import { Swiper, SwiperItem } from "@tarojs/components"
import classNames from "classnames"
import { useRef, useState } from "react"
import { useDatePciker } from "./context"
import { Day } from "./index.d"
import styles from "./index.module.scss"
import { adjustMonthYear, formatMonth, getNextIndex, getPreIndex } from "./utils"

interface IDate {
  year: number
  month: number
}

interface IDay extends IDate {
  day: number
  week?: number
}

type MonthInfo = {
  days: IDay[]
  month: number
  year: number
}

type MonthInfoListArgs = {
  date: IDate
  offset: number
  cur_index: number
}

type SelectDateProps = {
  onSelectDay?: (day: Day) => void
  onScroll?: (e: Day) => void
}

const cls = (s) => styles[`select_date_${s}`]

const WEEK_NAME = ["日", "一", "二", "三", "四", "五", "六"]

const getMonthInfoList = ({ date, cur_index, offset }: MonthInfoListArgs): MonthInfo[] => {
  const { year, month } = date
  const pre_index = getPreIndex(cur_index)
  const next_index = getNextIndex(cur_index)

  const pre_day_list: MonthInfo = getMonthInfo(
    adjustMonthYear({
      year,
      month,
      offset: offset - 1,
    })
  )
  const cur_day_list: MonthInfo = getMonthInfo(
    adjustMonthYear({
      year,
      month,
      offset,
    })
  )
  const next_day_list: MonthInfo = getMonthInfo(
    adjustMonthYear({
      year,
      month,
      offset: offset + 1,
    })
  )

  const res: MonthInfo[] = []
  res[cur_index] = cur_day_list
  res[pre_index] = pre_day_list
  res[next_index] = next_day_list
  return res
}

const normalizeDay = (y: number, m: number, d: number) => {
  const last_day = new Date(y, m, 0).getDate()
  return d > last_day ? last_day : d
}

const SelectDate: React.FC<SelectDateProps> = (props) => {
  const { onScroll, onSelectDay } = props

  const { inner_value } = useDatePciker()

  const [inner_selected_day] = useState(inner_value)

  const pre_index = useRef(1)

  const offset_ref = useRef(0)

  const cur_index = (((1 + offset_ref.current) % 3) + 3) % 3

  const [day_list, setDayList] = useState(() => {
    return getMonthInfoList({
      cur_index,
      date: inner_selected_day,
      offset: offset_ref.current,
    })
  })

  const week_cls = classNames(cls("week"), cls("item"))

  const handleSwiperChange = (e) => {
    const cur_index = e.detail.current
    const delta = (cur_index - pre_index.current + 3) % 3
    pre_index.current = cur_index
    offset_ref.current = delta === 2 ? offset_ref.current - 1 : offset_ref.current + 1

    const ym = adjustMonthYear({
      year: inner_selected_day.year,
      month: inner_selected_day.month,
      offset: offset_ref.current,
    })
    onScroll?.({
      ...inner_value,
      ...ym,
      day: normalizeDay(ym.year, ym.month, inner_value.day),
    })

    const data = getMonthInfoList({
      cur_index,
      date: inner_selected_day,
      offset: offset_ref.current,
    })

    setDayList(data)
  }

  const handleSelectDate = (day: IDay) => {
    onSelectDay?.({
      ...inner_selected_day,
      ...day,
    })
  }

  return (
    <div className={cls("body")}>
      <div className={cls("header")}>
        {WEEK_NAME.map((name) => (
          <div key={name} className={week_cls}>
            {name}
          </div>
        ))}
      </div>
      <Swiper className={cls("swiper")} vertical current={1} onChange={handleSwiperChange} circular>
        {day_list.map((days, index) => {
          const cur_month = days.month
          const day_cls = (day) => {
            return classNames(cls("day"), cls("item"), {
              [styles["first_day"]]: day.day === 1 && day.month === cur_month,
              [styles["not_this_month"]]: day.month !== cur_month,
              [styles["selected"]]: day.day === inner_value.day && day.month === cur_month,
            })
          }
          return (
            <SwiperItem key={index} className={cls("swiper_item")}>
              <div className={cls("content")}>
                {days.days.map((day, index) => (
                  <div key={index} className={day_cls(day)} onClick={() => handleSelectDate(day)}>
                    {day.day === 1 ? formatMonth(day.month) + "月" : day.day}
                  </div>
                ))}
              </div>
            </SwiperItem>
          )
        })}
      </Swiper>
    </div>
  )
}

export default SelectDate
