import { ReactNode } from "react"
import styles from "./index.module.scss"

type DividerType = {
  content: ReactNode
}

const Divider: React.FC<DividerType> = (props) => {
  const { content } = props
  return (
    <div className={styles.divider}>
      <div className={styles.line} />
      <div>{content}</div>
      <div className={styles.line} />
    </div>
  )
}

export default Divider
