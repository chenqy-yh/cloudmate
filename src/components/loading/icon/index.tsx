import classNames from "classnames"
import Icon from "../../icon/common"
import styles from "./index.module.scss"

type LoaderProps = {
  version?: number
  size?: number
  className?: string
}

const Loader: React.FC<LoaderProps> = (props) => {
  const { version = 1, size = 30, className } = props
  return <Icon icon={`loader-${version}` as IconName<"svg">} size={size} className={classNames(styles.loader, className)} />
}

export default Loader
