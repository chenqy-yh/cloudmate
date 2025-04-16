import CommonLayout from "@/layout/common"
import Time from "../time"
import AttendanceButton from "./components/atd-button"
import AttendanceRecord from "./components/atd-record"
import styles from "./index.module.scss"

const AttendanceView = () => {
  return (
    <CommonLayout title="考勤">
      <div className={styles.content}>
        <Time />
        <AttendanceRecord />
        <AttendanceButton />
      </div>
    </CommonLayout>
  )
}

export default AttendanceView
