import { useState } from "react"
import { DatePickerContext } from "./context"
import { Day } from "./index.d"
import PickerSelector from "./picker-selector"
import { getCurDay } from "./utils"

export type DatePickerProps = {
  isSelectorVisible: boolean
  value?: Day
  setSelectorVisible: (visible: boolean) => void
  onChange?: (value: Day | null) => void
}

const DatePicker: React.FC<DatePickerProps> = (props) => {
  const { value, isSelectorVisible, setSelectorVisible, onChange } = props

  const [inner_value, setInnerValue] = useState(value ?? getCurDay())

  const handleDateSelect = (value: Day) => {
    onChange?.(value)
  }

  return (
    <DatePickerContext.Provider
      value={{
        onSelect: handleDateSelect,
        isSelectorVisible,
        setSelectorVisible,
        inner_value,
        setInnerValue,
      }}
    >
      <PickerSelector show={isSelectorVisible} />
    </DatePickerContext.Provider>
  )
}

export default DatePicker
