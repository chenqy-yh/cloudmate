import classNames from "classnames"
import { ReactNode } from "react"
import styles from "./index.module.scss"
import Loader from "../icon"

type LoadingBoxProps = {
  loader?: ReactNode
  load: boolean
  children: ReactNode
} & React.HTMLAttributes<HTMLDivElement>

const LoadingBox: React.FC<LoadingBoxProps> = (props) => {
  const { children, load, className, ...rest } = props

  const loader = props.loader ? props.loader : <Loader version={2} />

  const cls = classNames(styles.loading_box, className)

  if (load) {
    return (
      <div className={cls} {...rest}>
        <div className={styles.loading_view}>{loader}</div>
      </div>
    )
  }

  return (
    <div className={cls} {...rest}>
      {children}
    </div>
  )
}

export default LoadingBox
