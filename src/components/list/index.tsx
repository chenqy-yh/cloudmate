import classNames from "classnames"
import Icon from "../icon"
import styles from "./index.module.scss"

type ListProps = {
  children: React.ReactNode
} & React.HTMLAttributes<HTMLDivElement>

type ListItemProps = {
  title: string
  extraText?: string
} & React.HTMLAttributes<HTMLDivElement>

type ListItem = React.FC<ListItemProps>

type List = React.FC<ListProps> & { ListItem: ListItem }

const ListItem: ListItem = (props) => {
  const { title, extraText, className, ...rest } = props
  return (
    <div className={classNames(styles.list_item, className)} {...rest}>
      <div className={styles.title}>{title}</div>
      <div className={styles.extra_text}>{extraText}</div>
      <Icon icon="arrow-right-2" size={30} />
    </div>
  )
}

const List: List = (props) => {
  const { children, className, ...rest } = props
  return (
    <div className={classNames(styles.list, className)} {...rest}>
      {children}
    </div>
  )
}

List.ListItem = ListItem

export default List
