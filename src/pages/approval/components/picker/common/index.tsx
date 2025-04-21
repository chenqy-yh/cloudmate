import InnerPicker from "@/components/picker/common"
import { useCallback, useState } from "react"
import Icon from "../../../../../components/icon/common"
import styles from "./index.module.scss"

export type SelectorItemValue = string | number

export type SelectorItem<T = SelectorItemValue> = {
  label: string
  value: T
}

export type PickerProps = {
  selector: SelectorItem[]
  value?: SelectorItemValue
  title: string
  important?: boolean
  placeholder?: string
  onChange?: (value: SelectorItemValue | null) => void
}

const Picker: React.FC<PickerProps> = ({ selector, value = "", title, important = false, placeholder = "请选择", onChange }) => {
  const [showSelector, setShowSelector] = useState(false)

  const selectItemLabel = selector.find((item) => item.value === value)?.label

  const handleShowActions = useCallback(() => setShowSelector(true), [])
  const handleClose = useCallback(() => setShowSelector(false), [])
  const handleSelect = (value: SelectorItemValue) => {
    onChange?.(value)
    setShowSelector(false)
  }

  const handleClear = (e) => {
    e.stopPropagation()
    onChange?.(null)
  }

  return (
    <>
      <div className={styles.picker} onClick={handleShowActions}>
        {important && <div className={styles.star}>*</div>}
        <div className={styles.select_bar}>
          <div className={styles.title}>{title}</div>
          {value ? <div className={styles.select_item_label}>{selectItemLabel}</div> : <div className={styles.placeholder}>{placeholder}</div>}

          {value && <Icon icon="close" size={30} className={styles.clear} onClick={handleClear} />}
          <Icon icon="arrow-right-2" size={30} className={styles.arrow} />
        </div>
      </div>
      <InnerPicker show={showSelector} selector={selector} onClose={handleClose} onSelect={handleSelect} />
    </>
  )
}

export default Picker
