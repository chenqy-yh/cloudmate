import Header from "@/components/header"
import Icon from "@/components/icon"
import classNames from "classnames"
import { useNavigate } from "react-router-dom"
import styles from "./index.module.scss"

type Title =
  | string
  | {
      placement: "left" | "center"
      content: string
    }

type CommonLayoutProps = {
  title: Title
  attachment?: React.ReactNode
  back?: boolean
  children?: React.ReactNode
  onBack?: () => void
} & Omit<React.HTMLAttributes<HTMLDivElement>, "title">

const CommonLayout: React.FC<CommonLayoutProps> = (props) => {
  const { children, title, back, className, attachment, onBack, ...rest } = props
  const navigate = useNavigate()

  const handleBack = () => {
    if (onBack) {
      onBack()
    } else {
      navigate(-1)
    }
  }
  return (
    <div className={classNames(styles.body, className)} {...rest}>
      <Header>
        <div
          className={classNames(styles.header, {
            [styles.back]: back,
          })}
        >
          {back && <Icon icon="back" size={30} onClick={handleBack} />}
          <div className={classNames(styles.title, { [styles[typeof title === "string" ? "left" : title.placement]]: true })}>
            {typeof title === "string" ? title : title.content}
          </div>
        </div>
        {attachment && <div className={styles.attachment}>{attachment}</div>}
      </Header>
      <div className={styles.main_content}>{children}</div>
    </div>
  )
}

export default CommonLayout
