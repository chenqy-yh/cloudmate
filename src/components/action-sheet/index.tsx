import classNames from "classnames"
import { FC, useEffect, useState } from "react"
import styles from "./index.module.scss"

interface ActionSheetProps {
  isOpened: boolean
  onClose?: () => void
  maskClosable?: boolean
  children?: React.ReactNode
}

const ActionSheet: FC<ActionSheetProps> = ({ isOpened, onClose, maskClosable = true, children }) => {
  const [isMounted, setIsMounted] = useState(false)
  const [isLeaving, setIsLeaving] = useState(false)

  // 当 visible 变为 true 时挂载组件
  useEffect(() => {
    if (isOpened) {
      setIsMounted(true)
      setIsLeaving(false)
    } else if (isMounted) {
      setIsLeaving(true) // 开始退出动画
    }
  }, [isOpened])

  const handleMaskClick = () => {
    if (maskClosable && onClose) {
      onClose()
    }
  }

  const handleAnimationEnd = () => {
    if (isLeaving) {
      setIsMounted(false)
    }
  }

  if (!isMounted) return null

  return (
    <div className={styles.wrapper}>
      <div
        className={classNames(styles.mask, {
          [styles.fadeOut]: isLeaving,
        })}
        onClick={handleMaskClick}
        onAnimationEnd={handleAnimationEnd}
      />
      <div
        className={classNames(styles.content, {
          [styles.slideOut]: isLeaving,
        })}
        onAnimationEnd={handleAnimationEnd}
      >
        {children}
      </div>
    </div>
  )
}

export default ActionSheet
