import ActionSheet from "@/components/action-sheet"
import { useState } from "react"
import { Day } from "."
import { useDatePciker } from "./context"
import styles from "./index.module.scss"
import SegmentedControl from "./segmented-control"
import SelectDate from "./select-date"
import SelectTime from "./select-time"
import { formatSegmentDate, formatSegmentTime } from "./utils"

type PickerSelectorProps = {
  show: boolean
}

const PickerSelector: React.FC<PickerSelectorProps> = ({ show }) => {
  const { inner_value, setSelectorVisible, setInnerValue, onSelect } = useDatePciker()

  const [active_segment, setActiveSegment] = useState(0)

  const segments = [formatSegmentDate(inner_value), formatSegmentTime(inner_value)]

  const handleConfirm = () => {
    onSelect?.(inner_value)
    setSelectorVisible(false)
    setActiveSegment(0)
  }

  const handleDateChange = (day: Day) => {
    setInnerValue(day)
    setActiveSegment(1)
  }

  const handleTimeChange = (hour, minute) => {
    setInnerValue({ ...inner_value, hour, minute })
  }

  // 处理 Selector 滚动
  const handleSelctDateSelectorScroll = (day) => {
    setInnerValue(day)
  }

  return (
    <ActionSheet isOpened={show} onClose={() => setSelectorVisible(false)}>
      <div className={styles.header}>
        <SegmentedControl values={segments} current={active_segment} onChange={setActiveSegment} />
        <div className={styles.confirm} onClick={handleConfirm}>
          确定
        </div>
      </div>
      <div className={styles.selector_content}>
        {active_segment === 0 && <SelectDate onScroll={handleSelctDateSelectorScroll} onSelectDay={handleDateChange} />}
        {active_segment === 1 && <SelectTime onSelectTime={handleTimeChange} />}
      </div>
    </ActionSheet>
  )
}

export default PickerSelector
