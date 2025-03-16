import { useEffect, useState } from "react"
import { Solar } from 'lunar-typescript'

export const useTime = () => {
  const [currentTime, setCurrentTime] = useState(new Date())

  const solar = Solar.fromDate(currentTime)
  // 两位 不足补0
  const solarSec = solar.getSecond().toString().padStart(2, '0')
  const solarMin = solar.getMinute().toString().padStart(2, '0')
  const solarHour = solar.getHour().toString().padStart(2, '0')
  const solarYear = solar.getYear()
  const solarMonth = solar.getMonth().toString().padStart(2, '0')
  const solarDay = solar.getDay().toString().padStart(2, '0')
  const week = solar.getWeekInChinese()

  const lunar = solar.getLunar()
  const lunarMonth = lunar.getMonthInChinese()
  const lunarDay = lunar.getDayInChinese()


  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => {
      clearInterval(timer)
    }
  }, [])

  return {
    solar: {
      sec: solarSec,
      min: solarMin,
      hour: solarHour,
      year: solarYear,
      month: solarMonth,
      day: solarDay,
      week: week
    },
    lunar: {
      month: lunarMonth,
      day: lunarDay
    }
  }

}
