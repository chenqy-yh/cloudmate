import ActionSheet from "@/components/action-sheet"
import styles from "./index.module.scss"

export type SelectorItem<T> = {
  label: string
  value: T
}

type PickerSelectorProps<T> = {
  show: boolean
  selector: SelectorItem<T>[]
  onClose?: () => void
  onSelect?: (value: T) => void
}

const Picker = <T,>({ show, selector, onClose, onSelect }: PickerSelectorProps<T>) => (
  <ActionSheet isOpened={show} onClose={onClose}>
    <div className={styles.list}>
      {selector.map((item, index) => (
        <div key={index} className={styles.list_item} onClick={() => onSelect?.(item.value)}>
          {item.label}
        </div>
      ))}
    </div>
  </ActionSheet>
)

export default Picker
