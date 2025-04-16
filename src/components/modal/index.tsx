import { FC, useEffect, useState } from "react"
import classNames from "classnames"
import styles from "./index.module.scss"

interface ModalProps {
  visible?: boolean // 受控模式
  defaultVisible?: boolean // 非受控初始状态
  onClose?: () => void
  maskClosable?: boolean
  children?: React.ReactNode
}

const Modal: FC<ModalProps> = ({ visible, defaultVisible = true, onClose, maskClosable = true, children }) => {
  const isControlled = visible !== undefined
  const [internalVisible, setInternalVisible] = useState(defaultVisible)
  const [show, setShow] = useState(defaultVisible)

  const mergedVisible = isControlled ? visible : internalVisible

  useEffect(() => {
    if (mergedVisible) {
      setShow(true)
    } else {
      setTimeout(() => setShow(false), 200)
    }
  }, [mergedVisible])

  const handleMaskClick = () => {
    if (maskClosable) {
      if (!isControlled) {
        setInternalVisible(false)
      }
      onClose?.()
    }
  }

  return (
    show && (
      <div className={classNames(styles.modal_wrapper, mergedVisible ? styles.show : styles.hide)}>
        <div className={styles.mask} onClick={handleMaskClick} />
        <div className={styles.content}>{children}</div>
      </div>
    )
  )
}

export default Modal
