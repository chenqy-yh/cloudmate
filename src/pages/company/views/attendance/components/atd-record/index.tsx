import { getPunchRecord } from "@/apis/attandence"
import { GET_SUCCESS } from "@/apis/constants"
import Icon from "@/components/icon"
import Timeline from "@/components/time-line"
import { setPunchRecord } from "@/store/reducers/attandence"
import { resetAuth } from "@/store/reducers/auth"
import { cur_sign_in_type_selector, punch_record_selector } from "@/store/selectors/attandence"
import Taro from "@tarojs/taro"
import { useEffect, useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import styles from "./index.module.scss"

type AttendanceDetailProps = {
  sign_in_type: number
  time?: Date
  location?: string
}

const sign_in_types = ["上班打卡", "下班打卡"]

const TextWithIcon = ({ icon, children }) => {
  return (
    <div className={styles.row}>
      <Icon className={styles.row_icon} icon={icon} />
      <div className={styles.text}>{children}</div>
    </div>
  )
}

const AttendanceDetail: React.FC<AttendanceDetailProps> = ({ sign_in_type, time, location }) => {
  const cur_sign_in_type = useSelector(cur_sign_in_type_selector)

  const isAwaitForChkIn = !time || !location

  const isMissCheckIn = isAwaitForChkIn && sign_in_type < cur_sign_in_type

  const formatTime = (time) => {
    if (!time) {
      return ""
    }
    const date = new Date(time)
    return `${date.getHours()}:${date.getMinutes()}`
  }

  const renderDetail = () => {
    if (!isAwaitForChkIn) {
      return (
        <>
          <TextWithIcon icon="time">
            {sign_in_type === 0 ? "上班" : "下班"}时间: {formatTime(time)}
          </TextWithIcon>
          <TextWithIcon icon="map">{location}</TextWithIcon>
        </>
      )
    }

    return <div className={styles.atd_miss}>{isMissCheckIn ? "未打卡" : "等待打卡"}</div>
  }

  return (
    <div className={styles.atd_body}>
      <div className={styles.sign_in_type}>{sign_in_types[sign_in_type]}</div>
      <div className={styles.atd_detail}>{renderDetail()}</div>
    </div>
  )
}

const getCurDay = () => ~~(Date.now() / (24 * 3600 * 1000))

const AttendanceRecord = () => {
  const dispatch = useDispatch()

  const res_handlers = useMemo(() => {
    const handleReponseSuccess = (res: Taro.request.SuccessCallbackResult) => {
      const punch_record_origin = res.data
      dispatch(setPunchRecord(punch_record_origin))
    }

    const handleUnauthorized = () => {
      Taro.showToast({
        title: "登录失效,请重新登录",
        icon: "error",
        duration: 2000,
      })
      dispatch(resetAuth())
    }

    const handleRequestError = (error: any) => {
      Taro.showToast({
        title: "服务器异常",
        icon: "error",
        duration: 2000,
      })
      console.error(error)
    }

    return { handleReponseSuccess, handleUnauthorized, handleRequestError }
  }, [dispatch])

  useEffect(() => {
    const current_day = getCurDay()
    const requestPunchRecord = async () => {
      const res = await getPunchRecord(current_day)
      if (res.statusCode === GET_SUCCESS) {
        res_handlers.handleReponseSuccess(res)
      } else if (res.statusCode === 401) {
        res_handlers.handleUnauthorized()
      } else {
        res_handlers.handleRequestError(res)
      }
    }
    requestPunchRecord()
  }, [res_handlers])

  const punch_record = useSelector(punch_record_selector)

  const renderPunchRecord = () => {
    return punch_record.map((record, idx) => {
      const { sign_in_type = idx, time, location } = record || {}
      return (
        <Timeline.Item key={idx}>
          <AttendanceDetail key={idx} sign_in_type={sign_in_type} time={time} location={location} />
        </Timeline.Item>
      )
    })
  }

  return <Timeline>{renderPunchRecord()}</Timeline>
}

export default AttendanceRecord
