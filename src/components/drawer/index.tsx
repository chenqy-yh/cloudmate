import classNames from "classnames"
import { FC, useEffect, useState } from "react"
import styles from "./index.module.scss"

interface DrawerProps {
  isOpened: boolean
  onClose?: () => void
  maskClosable?: boolean
  children?: React.ReactNode
  placement?: "top" | "bottom" | "left" | "right"
  height?: number | string
  width?: number | string
}

const isVertical = (placement: string) => {
  return placement === "top" || placement === "bottom"
}

const isHorizontal = (placement: string) => {
  return placement === "left" || placement === "right"
}

const ActionSheet: FC<DrawerProps> = ({ isOpened, onClose, maskClosable = true, children, placement = "right", height = "40vh", width = "40vw" }) => {
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

  const custom_style: React.CSSProperties = {
    height: isHorizontal(placement) ? "100vh" : height,
    width: isVertical(placement) ? "100%" : width,
  }

  if (!isMounted) return null

  return (
    <div
      className={classNames(styles.wrapper, {
        [styles[placement]]: true,
      })}
    >
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
        style={custom_style}
        onAnimationEnd={handleAnimationEnd}
      >
        {children}
      </div>
    </div>
  )
}

export default ActionSheet
