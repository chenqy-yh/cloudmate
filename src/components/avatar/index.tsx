import classNames from "classnames"
import { ReactNode } from "react"
import Icon from "../icon/common"
import styles from "./index.module.scss"

type AvatarProps = {
  className?: string
  username: string
  src?: string | null
  size?: number
  topLeftTag?: ReactNode
  topRightTag?: ReactNode
  bottomLeftTag?: ReactNode
  bottomRightTag?: ReactNode
  onClick?: () => void
}

const Avatar: React.FC<AvatarProps> = ({ className, username, src, size = 50, topLeftTag, topRightTag, bottomLeftTag, bottomRightTag, ...rest }) => {
  const initials = username.slice(-2).toUpperCase()

  const font_size = size * 0.4

  const renderAvatar = () =>
    src ? (
      <Icon className={classNames(styles.pic)} type="png" icon="user-1" size={size} {...rest} />
    ) : (
      <div
        className={classNames(styles.name, className)}
        style={{
          width: size,
          height: size,
          fontSize: font_size,
          lineHeight: font_size,
        }}
        {...rest}
      >
        {initials}
      </div>
    )

  return (
    <div
      className={classNames(styles.avatar_wrapper, className)}
      style={{
        width: size,
        height: size,
      }}
    >
      {renderAvatar()}
      {topLeftTag && <div className={styles.top_left_tag}>{topLeftTag}</div>}
      {topRightTag && <div className={styles.top_right_tag}>{topRightTag}</div>}
      {bottomLeftTag && <div className={styles.bottom_left_tag}>{bottomLeftTag}</div>}
      {bottomRightTag && <div className={styles.bottom_right_tag}>{bottomRightTag}</div>}
    </div>
  )
}

export default Avatar
